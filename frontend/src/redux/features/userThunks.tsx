import  {  createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useAppSelector } from "../../hooks/reduxHooks";

interface SigninUser {
    email: string,
    password: string
}
interface SignupUser extends SigninUser {
    fullName : string
}
interface PostItemPayload {
    title: string,
    description?: string,
    link? :string,
    contentType: string,
    tags?: string[]
}

export const userSignInThunk = createAsyncThunk('fetch/signin',async(payload:SigninUser, {rejectWithValue})=>{
    try{
        const response = await fetch("http://localhost:3000/api/v1/user/signin",{
            method: "POST", 
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const result = await response.json() 
        if(response.status === 200){
            toast.success(result.message)
            return result;
        }else {
             toast.error(result.error)
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const userSignupThunk = createAsyncThunk('fetch/signup',async(payload:SignupUser, {rejectWithValue})=>{
    try{
        const response = await fetch("http://localhost:3000/api/v1/user/signup",{
            method: "POST", 
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const result = await response.json()
        if(response.status === 200){
            toast.success(result.message)
            return result;
        }else {
            toast.error(result.error)
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const postThunk = createAsyncThunk('fetch/postItem',async(payload:PostItemPayload, {rejectWithValue})=>{
    try{
        const token = localStorage.getItem('token')
        const response = await fetch("http://localhost:3000/api/v1/content", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token : `${token}`
            },
            body: JSON.stringify(payload)
        })
        const result = await response.json()
        if(response.status === 200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const getListingThunk = createAsyncThunk('fetch/getItem',async(_, {rejectWithValue})=>{
    try{
        const token = localStorage.getItem('token')
        const response = await fetch("http://localhost:3000/api/v1/content", {
            headers: {
                token : `${token}`
            }
        })
        const result = await response.json()
        if(response.status === 200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
export const deleteListingThunk = createAsyncThunk('fetch/deleteItem',async(id: string, {rejectWithValue})=>{
    try{
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/v1/content/${id}`, {
            method: 'DELETE',
            headers: {
                token : `${token}`
            }
        })
        const result = await response.json()
        if(response.status === 200){
            return result
        }else{
            return rejectWithValue(result.error)
        }
    }catch(error){
        return rejectWithValue(error)
    }
})
