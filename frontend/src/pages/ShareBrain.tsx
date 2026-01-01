import { memo } from "react"

interface Shareprops {
    onclose: ()=> void,
}

 function ShareBrain(props: Shareprops){
    return (
        <div onClick={props.onclose} className="min-h-screen w-full fixed top-0 left-0 bg-black/70 flex justify-center items-center">
            <div onClick={(e)=> e.stopPropagation()} className="bg-white-primary w-96 rounded-md space-y-5 p-5">
                <div className="flex justify-between">
                    <p>Share your second brain</p>
                    <button onClick={props.onclose} className="cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="space-y-3">
                    <p className="text-sm text-gray-500">Share your entire collections of notes, documents, tweets, and videos with others. They'll be able to import your content into their own second brain.</p>
                    <button className="flex bg-purple-primary text-white p-2 w-full justify-center items-center gap-2 rounded-md cursor-pointer">
                        <i className="fa-solid fa-paste"></i>
                        <p>Share Brain</p>
                    </button>
                    <p className="text-center text-sm text-gray-600">3 items will be shared</p>
                </div>
            </div>
        </div>
    )
}

export default memo(ShareBrain)