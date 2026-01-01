import { memo } from "react"

interface Props {
    item?: string
}

function NotesCard({item}: Props){
    return (
        <div>{item}</div>
    )
}
export default memo(NotesCard)