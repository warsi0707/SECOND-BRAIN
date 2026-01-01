import  React, { memo, type ReactElement } from "react"

interface ButtonProps {
    icon: ReactElement,
    title: string,
    onclick?:()=>  React.MouseEventHandler<HTMLButtonElement> | undefined
}

function CardButton({icon, title, onclick}: ButtonProps){
    return (
        <button onClick={onclick} title={title} className="cursor-pointer text-gray-700">{icon}</button>
    )
}

export default memo(CardButton)