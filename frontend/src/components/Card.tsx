import { memo, useState } from "react";
import CardButton from "./CardButton";
import YoutubeEmbed from "./YoutubeEmbed";
import Tags from "./Tags";
import TwitterEmbed from "./TwitterEmbed";
import Document from "./Document";
import LinksCard from "./LinksCard";
import NotesCard from "./NotesCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { deleteListingThunk } from "../redux/features/userThunks";
import useDateFormater from "../hooks/useDateFormate";
import ShareBrain from "./share/ShareBrain";

interface Listing {
    _id: string,
    title: string,
    contentType: string,
    createdAt:string,
    description?: string,
    link?: string,
    tags?: string[],
    userId: {
        email?: string,
        fullName?: string
    }
}

interface Cardprops {
    listing: Listing
}

function Card({listing}: Cardprops){
    const dispatch = useAppDispatch()
    const {isAuthenticated} = useAppSelector(state=> state.user.user)
    const {date, month,time} = useDateFormater(listing.createdAt)
    const [isSharing, setIsSharing] = useState<boolean>(false)

    const handleDelte =(id:string)=>{
        if(!id) return;
        dispatch(deleteListingThunk(id))
    }
    const handleShare =(id:string)=>{
        if(!id) return;
        setIsSharing(true)
    }
    return (
        <>
        <div className="border flex flex-col justify-between min-h-72 rounded-md border-gray-300 space-y-5 shadow-xl w-72 p-4">
            <div className="flex justify-between">
                <div className="flex gap-1">
                    <p>
                        {listing?.contentType === "Videos" && <i className="fa-brands fa-youtube"></i>}
                        {listing.contentType === "Twitter" && <i className="fa-brands fa-twitter"></i>}
                        {listing.contentType === "Document" && <i className="fa-solid fa-file"></i>}
                        {listing.contentType === "Links" && <i className="fa-solid fa-link"></i>}
                        {listing.contentType=== "Tags" && <i className="fa-solid fa-hashtag"></i>}
                        {listing.contentType === "Notes" && <i className="fa-solid fa-note-sticky"></i>}
                    </p>
                    <p>{listing.title}</p>
                </div>
                <div className="flex gap-2">
                    {isAuthenticated ===true &&<>
                    <CardButton onclick={()=> handleShare(listing._id)} title="Share" icon={<i className="fa-solid fa-share-nodes"></i>}/>
                    <CardButton onclick={()=> handleDelte(listing._id)} title="Delete" icon={<i className="fa-solid fa-trash"></i>}/></>}
                </div>
            </div>
            <div>
                {listing.contentType === 'Videos' && <YoutubeEmbed link={`${listing.link}`}/>}
                {listing.contentType === 'Twitter' && <TwitterEmbed link={`${listing.link}`}/>}
                {listing.contentType === 'Document' && <Document/>}
                {listing.contentType === 'Links' && <LinksCard links={`${listing.link}`}/>}
                {listing.contentType === 'Notes' && <NotesCard item={listing.description} />}
                
            </div>
            <div className="flex flex-wrap gap-2">
                {listing.tags?.map((item)=> <Tags title={item}/> )}
            </div>
            <div className="flex gap-1 text-sm">
                <p>{listing.userId.fullName?.split(' ')[0]},</p>
                <p>{date} {month}</p>
                <p>{time}</p>
            </div>
        </div>
        {isSharing && <ShareBrain listing={[listing]} onclose={()=> setIsSharing(false)}/>}
        </>
    )
}
export default memo(Card)