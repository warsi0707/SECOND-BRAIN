import  { memo } from "react"
interface TagProp {
    title: string
}

function Tags(props:TagProp){
    return (
        <p className="bg-purple-secondary px-2 rounded-full text-purple-primary text-sm italic">#{props.title}</p>
    )
}

export default memo(Tags)