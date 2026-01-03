import { Link, useParams, useSearchParams } from "react-router";
import Card from "../components/Card";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import Sidebar from "./Sidebar";
import { useEffect, useId } from "react";
import { getSharedItemById, getSharedItemByUser } from "../redux/features/userThunks";

export default function SharedHomePage(){
    const dispatch = useAppDispatch()
    const {items, loading} = useAppSelector(state=> state.user.listing)
    const {id} = useParams<string>()
   const [searchParams, setSearchParams] = useSearchParams();
    const userid = searchParams.get('userid')

    useEffect(()=>{
        if(!id) return
         dispatch(getSharedItemById(id))
    },[])

    useEffect(()=>{
        if(!userid) return;
          dispatch(getSharedItemByUser(userid as string))
    },[userid])
    return (
        <>
        <div className="min-h-screen w-full bg-slate-400 grid grid-cols-10">
            <Sidebar className="col-span-2"/>
            <div className="w-full col-span-8 min-h-screen bg-white-primary p-7">
                <div className="flex justify-between">
                    <p className="text-2xl font-semibold">All notes</p>
                    <div className="flex gap-2">
                        <Link to={"/signin"} className="bg-purple-primary text-white flex items-center p-2 px-4 rounded-md ">Signin</Link>
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                {items.length <=0  &&
                <div className="flex justify-center items-center mt-32">
                    <h1 className="text-2xl font-bold">No listing</h1>
                </div>}
                <div className="py-10 flex flex-col justify-center items-start md:grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {items && items.map((listing)=> (
                        <Card key={listing._id} listing={listing}/>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}