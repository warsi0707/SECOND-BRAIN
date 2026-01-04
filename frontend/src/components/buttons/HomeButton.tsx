import  { memo, type ReactElement } from "react"

interface ButtonProps {
    icon: ReactElement,
    title: string,
    className: string,
    doingSomething: (value:boolean)=> void,
}

function HomeButton(props: ButtonProps){
    return (
        <button onClick={()=> props.doingSomething(true)} className={` flex gap-2 p-2  rounded-md cursor-pointer ${props.className}`}>
            <p>{props.icon}</p>
            <p>{props.title}</p>
        </button>
    )
}

export default memo(HomeButton)