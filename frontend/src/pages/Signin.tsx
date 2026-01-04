import { Link } from "react-router";
import FormInput from "../components/FormInput";
import SignButton from "../components/buttons/SignButton";
import { useState } from "react";
import { signinSchema } from "../schema/schema";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { userSignInThunk } from "../redux/features/userThunks";
import type { AppDispatch } from "../redux/store/store";

interface UserForm {
    email: string,
    password: string
}

interface FormError {
    email?: string[],
    password?: string[]
}
type FormErrorType = Partial<FormError>

export default function Signin(){
    const dispatch = useDispatch<AppDispatch>()
    const [userForm, setUserForm] = useState<UserForm>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<FormErrorType>({})

    const handleChnage =(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setUserForm(prev=> ({...prev, [name]: value}))
        setError({})
    }
    const handleSignin =()=>{
        const { success, error} = signinSchema.safeParse(userForm)
        if(!success){
            const err = z.flattenError(error).fieldErrors
            setError(err)
            return;
        }
        const email = userForm.email;
        const password = userForm.password
        dispatch(userSignInThunk({email, password}))
    
    }
    return (
        <div className="min-h-screen lg:w-275  mx-auto flex gap-32 flex-col md:flex-row lg:justify-between ">
            <div className="hidden md:flex w-full lg:min-h-screen  justify-start  lg:pt-32 items-start p-5">
                <img src="/sign.svg" className="h-full -mt-32 w-full" alt="" />
            </div>
            <div className="w-full lg:min-h-screen  p-5 flex flex-col gap-3   lg:pt-32">
                <h1 className="text-2xl font-semibold py-5">Login</h1>
                <FormInput error={error.email} value={userForm.email} handleChnage={handleChnage} name={'email'}  label={"Email"} type={'email'} placeHolder="Enter your email"/>
                <FormInput error={error.password} value={userForm.password} handleChnage={handleChnage} name={'password'}  label={"Password"} type={'password'} />
                <div className="flex items-center text-sm">
                    <p>Have already an account? </p>
                    <Link to={"/signup"} className="underline text-purple-primary">Register</Link>
                </div>
                <SignButton onclick={handleSignin} title={"Signin"}/>
            </div>
        </div>
    )
}