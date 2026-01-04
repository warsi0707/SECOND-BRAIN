export default function HomeCardSkell(){
    return (
        <div className="py-10 flex flex-col justify-center items-start md:grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map((e,i)=>(<div key={i} className="h-80 w-72 rounded-md bg-slate-200"></div>))} 
        </div>
    )
}