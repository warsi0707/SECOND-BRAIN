import  React, { memo } from "react";
import CardButton from "./CardButton";
import YoutubeEmbed from "./YoutubeEmbed";
import Tags from "./Tags";
import TwitterEmbed from "./TwitterEmbed";
import Document from "./Document";
import LinksCard from "./LinksCard";
import NotesCard from "./NotesCard";
import { useAppDispatch } from "../hooks/reduxHooks";
import { deleteListingThunk } from "../redux/features/userThunks";
import useDateFormater from "../hooks/useDateFormate";

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
        fullname?: string
    }
}

interface Cardprops {
    listing: Listing
}

function Card({listing}: Cardprops){
    const dispatch = useAppDispatch()
    const {date, month, year,time} = useDateFormater(listing.createdAt)

    const handleDelte =(id:string)=>{
        if(!id) return;
        dispatch(deleteListingThunk(id))
    }
    return (
        <div className="border min-h-72 rounded-md border-gray-300 space-y-5 shadow-sm w-72 p-4">
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
                    <CardButton title="Share" icon={<i className="fa-solid fa-share-nodes"></i>}/>
                    <CardButton onclick={()=> handleDelte(listing._id)} title="Delete" icon={<i className="fa-solid fa-trash"></i>}/>
                </div>
            </div>
            <div>
                {listing.contentType === 'Youtube' && <YoutubeEmbed/>}
                {listing.contentType === 'Twitter' && <TwitterEmbed/>}
                {listing.contentType === 'Document' && <Document/>}
                {listing.contentType === 'Links' && <LinksCard links={`${listing.link}`}/>}
                {listing.contentType === 'Notes' && <NotesCard item={listing.description} />}
                
            </div>
            <div className="flex flex-wrap gap-2">
                {listing.tags?.map((item)=> <Tags title={item}/> )}
            </div>
            <div className="flex gap-2 text-sm">
                <p>Created at: </p>
                <p>{date}/{month}/{year}</p>
                <p>{time}</p>
            </div>
        </div>
    )
}
export default memo(Card)