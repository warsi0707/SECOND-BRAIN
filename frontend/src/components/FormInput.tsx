import React, { memo, useState } from "react"

interface FormInputProps {
    label: string,
    value?: string,
    type: string,
    name: string,
    error?: string[],
    placeHolder?: string,
    handleChnage?: (e:React.ChangeEvent<HTMLInputElement>) => void
    // (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

function FormInput({label, value, type, name, error, placeHolder, handleChnage}: FormInputProps){
    const [isHide, setIsHide] = useState(false)
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="" className="text-sm">{label}</label>
            {type === "password" ?
           
            <div className="border border-gray-400 w-full flex justify-between px-2 rounded-md">
                <input value={value} onChange={handleChnage} name={name} type={isHide? "text": "password"} placeholder="Type here" className=" p-2 w-full outline-none text-sm " />
                {isHide? 
                <button onClick={()=> setIsHide(!isHide)} className="cursor-pointer"><i className="fa-regular fa-eye-slash"></i></button>:
                 <button onClick={()=> setIsHide(!isHide)} className="cursor-pointer"><i className="fa-regular fa-eye"></i></button>
                }
            </div>:
             <input value={value} onChange={handleChnage} type={type} name={name} placeholder={placeHolder} className="border border-gray-400 outline-none p-2 text-sm rounded-md"/>}
            <p className="text-xs text-red-500 relative">{error}</p>
        </div>
    )
}
export default memo(FormInput)