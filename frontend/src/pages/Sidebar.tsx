import NavButton from "../components/buttons/NavButton";

interface Props {
    className?: string
}

export default function Sidebar({className}: Props){
    return(
         <div className={`w-full  min-h-screen bg-white border-r space-y-10 border-gray-200 p-3 text-xl ${className}`}>
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
    )
}