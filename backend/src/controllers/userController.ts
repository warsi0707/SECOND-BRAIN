import type { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../model/userModel.js";
import { signinSchema, signupSchema } from "../schema/zodSchema.js";
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { USER_JWT_SECRET } from "../config/envConfig.js";



export const userSignup =async (req:Request, res:Response)=>{
    const {fullName, email, password} = req.body;
    try{
        const {error, success} = signupSchema.safeParse(req.body)
        if(!success){
            return res.status(404).json({
                error: z.flattenError(error).fieldErrors
            })
        }
    
        const user = await User.findOne({email})
        if(user){
            return res.status(501).json({
                error: "User already exists"
            })
        }
        const hashPassword = await bcrypt.hash(password,10)
        await User.create({
            email,
            fullName,
            password: hashPassword
        })
        return res.json({
            message: "User signup successfully"
        })

    }catch(error){
        return res.status(500).json({
            error: error
        })
    }
}
export const signin = async(req:Request, res:Response)=>{
    const {email, password} = req.body;
    try{
         const {error, success} = signinSchema.safeParse(req.body)
        if(!success){
            return res.status(404).json({
                error: z.flattenError(error).fieldErrors
            })
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                error: "User not found"
            })
        }
        const copmarePass = user? await bcrypt.compare(password, user.password): false
        if(!copmarePass){
            return res.status(404).json({
                error: "Incorrect passowrd"
            })
        }
        if(copmarePass){
            if(!USER_JWT_SECRET){
                return res.status(404).json({
                      error: "Error"
                })
            }
            const token = jwt.sign({
                user: user._id
            },USER_JWT_SECRET)
            return res.json({
                message: "Signin success",
                token: token, 
                user: {
                    userId: user._id,
                    email: user.email,
                    fullName: user.fullName
                }
            })
        }
    }catch(error){
        return res.status(501).json({
            error: error
        })
    }
}
export const getContent = async(req:Request & {user?:any}, res:Response)=>{
    
    try{
        return res.json(req.user as string)
    }catch(error){
        return res.status(500).json({
            error: error
        })
    }
}