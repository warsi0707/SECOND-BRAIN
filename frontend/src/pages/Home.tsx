import { useEffect, useState } from "react";
import Card from "../components/Card";
import HomeButton from "../components/HomeButton";
import NavButton from "../components/NavButton";
import ShareBrain from "./ShareBrain";
import PostContent from "./PostContent";
import LogoutButton from "../components/LogoutButton";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getListingThunk } from "../redux/features/userThunks";

export default function Home(){
    const dispatch = useAppDispatch()
    const {loading, items} = useAppSelector(state=> state.user.listing)
    const [isSharing, setIsSharing] = useState<boolean>(false)
    const [isPosting, setIsPosting] = useState(false)

    useEffect(()=>{
        dispatch(getListingThunk())
    },[])
    return (
        <>
        <div className="min-h-screen w-full bg-slate-400 grid grid-cols-10">
            <div className="w-full col-span-2 min-h-screen bg-white border-r space-y-10 border-gray-200 p-3 text-xl">
                <div className="flex items-center gap-3">
                    <i className="fa-solid fa-brain text-2xl text-purple-primary"></i>
                    <h1 className="hidden md:flex">Second Brain</h1>
                </div>
                <div className="flex flex-col md:p-3 gap-5">
                    <NavButton icon={<i className="fa-brands fa-twitter"></i>} title="Twitter" handleClick={()=>{}}/>
                    <NavButton icon={<i className="fa-brands fa-youtube"></i>} title="Videos" handleClick={()=>{}}/>
                    <NavButton icon={<i className="fa-solid fa-file"></i>} title="Documents" handleClick={()=>{}}/>
                    <NavButton icon={<i className="fa-solid fa-link"></i>} title="Links" handleClick={()=>{}}/>
                    <NavButton icon={<i className="fa-solid fa-hashtag"></i>} title="Tags" handleClick={()=>{}}/>
                </div>
            </div>
            <div className="w-full col-span-8 min-h-screen bg-white-primary p-7">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold">All notes</p>
                    <div className="flex gap-2">
                        <HomeButton doingSomething={setIsSharing} icon={<i className="fa-solid fa-share-nodes"></i>} title="Share Brain" className="bg-purple-secondary text-purple-primary"/>
                        <HomeButton doingSomething={setIsPosting} icon={<i className="fa-solid fa-plus"></i>} title="Add content" className="bg-purple-primary text-white"/>
                        <LogoutButton/>
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                {items.length <=0  &&
                <div>No listing</div>}
                <div className="py-10 flex flex-col justify-center items-center md:grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {items && items.map((listing)=> (
                        <Card key={listing._id} listing={listing}/>
                    ))}
                </div>
            </div>
        </div>
        {isSharing == true && <ShareBrain onclose={()=> setIsSharing(false)}/>}
        {isPosting == true && <PostContent onclose={()=> setIsPosting(false)} />}
        </>
    )
}