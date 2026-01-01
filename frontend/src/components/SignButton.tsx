import { memo } from "react"

interface ButtonProps {
    title: string,
    onclick?: ()=> void
}

function SignButton({title, onclick}: ButtonProps){
    return (
        <button onClick={onclick} className="bg-purple-primary text-white p-2 text-sm rounded-md cursor-pointer">{title}</button>
    )
}
export default memo(SignButton)