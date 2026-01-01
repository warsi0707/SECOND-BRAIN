import type { NextFunction, Request, Response } from "express";

function InputValidation(req:Request, res:Response, next:NextFunction, schema:any){
    const {error} = schema.safeParse()

}