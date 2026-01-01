import type { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'
import { USER_JWT_SECRET } from "../config/envConfig.js";

interface Request {
    user?: string,
    headers?: any
}

function AuthChecker (req:Request , res:Response, next:NextFunction){
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
        if(decoded){
            req.user= (decoded as any).user
            next()
        }
    }catch(error){
        return res.status(404).json({
            error: "Not authenticated"
        })
    }
}

export default AuthChecker