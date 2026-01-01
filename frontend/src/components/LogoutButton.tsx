import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../redux/features/userSlice";

export default function LogoutButton(){
    const dispatch = useAppDispatch()

    return (
        <button onClick={()=> dispatch(logout())} className="bg-red-700 p-2 px-3 text-white rounded-md cursor-pointer">Logout</button>
    )
}