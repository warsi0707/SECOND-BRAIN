import { Link } from "react-router";

export default function NotFound(){
    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center">
            <img src="/notfound.svg" className="w-full h-96" alt="" />
           <div className="flex items-center gap-1 bg-purple-primary text-white p-2 rounded-md">
            <i className="fa-solid fa-arrow-left"></i>
             <Link to={"/"}>Back to home</Link>
           </div>
        </div>
    )
}