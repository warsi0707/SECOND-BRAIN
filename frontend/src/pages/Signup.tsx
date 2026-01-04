import { Link, useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import SignButton from "../components/buttons/SignButton";
import { useState } from "react";
import z from "zod";
import { signupSchema } from "../schema/schema";
import { userSignupThunk } from "../redux/features/userThunks";
import { useAppDispatch } from "../hooks/reduxHooks";

interface UserForm {
  fullName: string;
  email: string,
  password: string
}
interface FormError {
    fullName: string[];
    email: string[],
    password: string[]
}
type FormErrorType = Partial<FormError>

export default function Signup() {
  const navigate = useNavigate()
    const dispatch = useAppDispatch()
  const [userForm, setUserForm] = useState<UserForm>({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<FormErrorType>({})

  const handleChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUserForm(prev=> ({...prev, [name]: value}))
    setError({})
  };

  const handleSignup =async()=>{
    const {error, success} = signupSchema.safeParse(userForm)
    if(!success){
        const fieldError = z.flattenError(error).fieldErrors
        setError(fieldError)
        return;
    }
   const result =await dispatch(userSignupThunk(userForm))
   if(result.type === "fetch/signup/fulfilled"){
    navigate("/signin")
   }
  }

  return (
    <div className="min-h-screen lg:w-275  mx-auto flex gap-32 flex-col md:flex-row lg:justify-between ">
      <div className="hidden md:flex w-full lg:min-h-screen  justify-start  lg:pt-32 items-start p-5">
        <img src="/sign.svg" className="h-full -mt-12 w-full" alt="" />
      </div>
      <div className="w-full lg:min-h-screen  p-5 flex flex-col gap-3   lg:pt-32">
        <h1 className="text-2xl font-semibold py-5">Register as new user</h1>
        <FormInput
          value={userForm.fullName}
          handleChnage={handleChnage}
          error={error.fullName}
          name={"fullName"}
          label={"Full Name"}
          type={"text"}
          placeHolder="Enter your Fullname"
        />
        <FormInput
          value={userForm.email}
          handleChnage={handleChnage}
          error={error.email}
          name={"email"}
          label={"Email"}
          type={"email"}
          placeHolder="Enter email"
        />
        <FormInput
          value={userForm.password}
          handleChnage={handleChnage}
          error={error.password}
          name={"password"}
          label={"Password"}
          type={"password"}
        />

        <div className="flex items-center text-sm">
          <p>Have already an account? </p>
          <Link to={"/signin"} className="underline text-purple-primary">
            Signin
          </Link>
        </div>
        <SignButton onclick={handleSignup} title="Signup" />
      </div>
    </div>
  );
}
