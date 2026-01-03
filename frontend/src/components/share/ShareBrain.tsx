import { memo, useEffect, useState } from "react"
import CopyButton from "./CopyButton"

interface Listing {
    _id: string,
    contentType?: string 
    createdAt: string,
    description?: string,
    link?: string,
    tags?: string[],
    title?: string
    userId?: {
        _id?: string,
        email?: string,
        fullName?: string
    }
}

interface Shareprops {
    onclose?: ()=> void,
    listing: Listing[] 
}

 function ShareBrain({listing,onclose}: Shareprops){
    const [isCopied, setIsCopied] = useState<boolean>(false)

    const handleCopyLink = async()=>{
        if(listing.length >1){
            const userid = listing.map((item)=> item.userId?._id)
            await navigator.clipboard.writeText(`http://localhost:5173/shared-contents?userid=${userid[0]}`)
            setIsCopied(true)
        }else{
            const links = listing.map((item)=> item._id)
            await navigator.clipboard.writeText(`http://localhost:5173/shared-content/${links}`)
            setIsCopied(true)
        }
     
    }
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
        return () => document.body.classList.remove("overflow-hidden");
    }, []);
    return (
        <div onClick={onclose} className="min-h-screen w-full fixed top-0 inset-0 left-0 bg-black/70 flex justify-center items-center">
            <div onClick={(e)=> e.stopPropagation()} className="bg-white-primary w-96 rounded-md z-auto space-y-5 p-5">
                <div className="flex justify-between">
                    <p>Share your second brain</p>
                    <button onClick={onclose} className="cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="space-y-3">
                    <p className="text-sm text-gray-500">Share your entire collections of notes, documents, tweets, and videos with others. They'll be able to import your content into their own second brain.</p>
                    <CopyButton isCopied={isCopied} handleCopyLink={handleCopyLink}/>
                    <p className="text-center text-sm text-gray-600">{listing.length} items will be shared</p>
                </div>
            </div>
        </div>
    )
}

export default memo(ShareBrain)