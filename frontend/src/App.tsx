import {BrowserRouter, Routes, Route} from "react-router"
import { lazy, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks"
import { authVerify } from "./redux/features/userSlice"
import SharedHomePage from "./pages/SharedHomePage"
import NotFound from "./pages/NotFound"

const Home = lazy(()=> import("./pages/Home"))
const Signup = lazy(()=> import("./pages/Signup"))
const Signin = lazy(()=> import("./pages/Signin"))

function App() {
  const dispatch = useAppDispatch()
  const {isAuthenticated} = useAppSelector(state=> state.user.user)

  useEffect(()=>{
   dispatch(authVerify())
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={isAuthenticated? <Home/>: <Signin/>}/>
        <Route path="/signup" element={isAuthenticated? <Home/>: <Signup/>}/>
        <Route path="/signin" element={isAuthenticated? <Home/>: <Signin/>}/>
        <Route path="/shared-content/:id" element={<SharedHomePage/>}/>
        <Route path="/shared-contents" element={<SharedHomePage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
