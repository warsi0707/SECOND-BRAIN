import type { Request, Response } from "express";
import Content from "../model/contentModel.js";
import { contentSchema } from "../schema/zodSchema.js";
import { z } from 'zod'
import mongoose from "mongoose";

export const getContents =async(req:Request & {user?: any}, res:Response)=>{
    try{
        const contents = await Content.find({userId: req.user}).populate('userId', '-password')
        if(contents.length <=0){
            return res.json({
                contents: []
            })
        }
        return res.json({
                contents: contents
            })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const postContent = async(req: Request &{user?: any}, res:Response)=>{
    const {contentType, link, title, description, tags} = req.body;
    try{
        // const {error, success} = contentSchema.safeParse(req.body)
        // if(!success){
        //     return res.status(404).json({
        //         error: z.flattenError(error).fieldErrors
        //     })
        // }
        const newContent = await Content.create({
            contentType,
            link,
            title,
            description,
            tags,
            userId: req.user
        })
        return res.json({
            message: "Content posted",
            content: newContent
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const sharedContent = async(req: Request, res:Response)=>{
    const {id} = req.params;
    try{
        const content = await Content.findById(id).populate('userId', '-password')
        if(!content){
            return res.json({
                content: {}
            })
        }
        return res.json({
            content
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const sharedContents = async(req:Request, res:Response)=>{
    const {userid} = req.query
    try{
        const content = await Content.find({userId: new mongoose.Types.ObjectId(userid as string)}).populate('userId', '-password')
        return res.json({
            content: content
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}
export const deleteContent = async(req: Request, res:Response)=>{
    const {id} = req.params;
    try{
        const content = await Content.findByIdAndDelete(id)
        return res.json({
            message: "Content removed",
            content: content
        })
    }catch(error){
        return res.status(404).json({
            error: error
        })
    }
}