import  { memo } from "react"
import type {ReactElement} from 'react'

interface ButtonProps {
    icon: ReactElement,
    title: string,
    handleClick: ()=> void,
    isActive?: boolean
}

function NavButton(props: ButtonProps){
    return (
        <button onClick={props.handleClick} className="flex gap-2 cursor-pointer text-gray-700 hover:bg-white-primary transition-all duration-300 rounded-md p-2">
            <p>{props.icon}</p>
            <p className="hidden md:flex ">{props.title}</p>
        </button>
    )
}
export default memo(NavButton)