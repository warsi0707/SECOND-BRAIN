import type { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'
import { USER_JWT_SECRET } from "../config/envConfig.js";
import User from "../model/userModel.js";

interface Request {
    user?: string,
    headers?: any
}
interface Decoded {
    user: string
}

async function AuthChecker (req:Request , res:Response, next:NextFunction){
    const token = req.headers.token
    try{
        if(!token){
            return res.status(404).json({
                error: "Not authenticated"
            })
        }
        if(!USER_JWT_SECRET){
            return res.status(404).json({
                error: "error"
            })
        }
        const decoded = jwt.verify(token as string, USER_JWT_SECRET)
        if(typeof decoded === 'object' && decoded !== null && 'user' in decoded){
             const user = await User.findById(decoded.user)
             if(user){
                 req.user= (decoded as any).user
                next()
             }
        }
       
        // if(decoded){
        //     req.user= (decoded as any).user
        //     next()
        // }
    }catch(error){
        return res.status(404).json({
            error: "Not authenticated"
        })
    }
}

export default AuthChecker