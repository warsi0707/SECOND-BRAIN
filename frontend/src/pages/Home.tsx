import { useEffect, useState } from "react";
import Card from "../components/Card";
import HomeButton from "../components/HomeButton";
import PostContent from "./PostContent";
import LogoutButton from "../components/LogoutButton";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getListingThunk } from "../redux/features/userThunks";
import ShareBrain from "../components/share/ShareBrain";
import { Link } from "react-router";
import Sidebar from "./Sidebar";

export default function Home(){
    const dispatch = useAppDispatch()
    const {loading, items} = useAppSelector(state=> state.user.listing)
    const {isAuthenticated} = useAppSelector(state=> state.user.user)
    const [isSharing, setIsSharing] = useState<boolean>(false)
    const [isPosting, setIsPosting] = useState(false)
    
    useEffect(()=>{
        dispatch(getListingThunk())
    },[])

    return (
        <>
        <div className="min-h-screen w-full bg-slate-400 grid grid-cols-10">
            <Sidebar className="col-span-2"/>
            <div className="w-full col-span-8 min-h-screen bg-white-primary p-7">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold">All notes</p>
                    <div className="flex gap-2">
                        {isAuthenticated == true ?<>
                        <HomeButton doingSomething={setIsSharing} icon={<i className="fa-solid fa-share-nodes"></i>} title="Share Brain" className="bg-purple-secondary text-purple-primary"/>
                        <HomeButton doingSomething={setIsPosting} icon={<i className="fa-solid fa-plus"></i>} title="Add content" className="bg-purple-primary text-white"/>
                        <LogoutButton/></>:
                        <Link to={"/signin"} className="bg-purple-primary text-white flex items-center p-2 px-4 rounded-md ">Signin</Link>}
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                {items.length <=0  &&
                <div className="flex justify-center items-center mt-32">
                    <h1 className="text-2xl font-bold">No listing</h1>
                </div>}
                <div className="py-10 flex flex-col justify-center items-start md:grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                    { items && items.map((listing)=> (
                        <Card key={listing._id} listing={listing}/>
                    ))}
                </div>
            </div>
        </div>
        {isSharing == true && items && <ShareBrain listing={items} onclose={()=> setIsSharing(false)}/>}
        {isPosting == true && <PostContent onclose={()=> setIsPosting(false)} />}
        </>
    )
}