import { memo } from "react"
import { Link } from "react-router"

interface Links {
    links: string
}

function LinksCard({links}:Links){
    return (
        <div className=" gap-2 w-full">
            <p>Link: </p>
            <Link to={links} className="hover:underline text-purple-primary flex wrap-anywhere text-wrap">{links}</Link>
        </div>
    )
}

export default memo(LinksCard)