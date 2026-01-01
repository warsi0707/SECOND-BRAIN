import { memo } from "react"

interface ButtonProp {
    title: string,
    onclick: ()=> void
}

function PostButton({title, onclick}: ButtonProp){
    return (
         <button onClick={onclick} className="bg-purple-primary p-2 rounded-md text-white cursor-pointer">{title}</button>
    )
}

export default memo(PostButton)