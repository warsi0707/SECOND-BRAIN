import { createSlice } from "@reduxjs/toolkit";
import { deleteListingThunk, getListingThunk, getSharedItemById, getSharedItemByUser, postThunk, userSignInThunk, userSignupThunk } from "./userThunks";
import toast from "react-hot-toast";

interface User {
    id: string, 
    email: string,
    fullName: string
}
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
interface UserState {
    loading: boolean,
    token: string,
    isAuthenticated: boolean,
    user: User  | null
}
interface ListingState {
    loading: boolean,
    items: Listing[]
}

interface InitialState {
    user: UserState,
    listing: ListingState
}
const initialState:InitialState = {
     user: {
            loading: false,
            token: localStorage.getItem('token') || "",
            isAuthenticated: false,
            user: JSON.parse(localStorage.getItem('user') || '{}')
        },
        listing: {
            loading: false,
            items: []
        }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authVerify: (state)=>{
            const token = localStorage.getItem('token')
            if(token){
                state.user.isAuthenticated = true
            }
        },
        logout: (state)=>{
            const token = localStorage.getItem('token')
            if(token){
                state.user.isAuthenticated = false
                state.user.user = null
                toast.success("Logout")
            }
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(userSignInThunk.pending, (state)=>{
            state.user.loading = true
        })
        .addCase(userSignInThunk.rejected, (state)=>{
            state.user.loading = false
           
        })
        .addCase(userSignInThunk.fulfilled, (state, action)=>{
            state.user.loading = false
            state.user.token = action.payload.token
            state.user.user= action.payload.user
            state.user.isAuthenticated = true
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        })
        .addCase(userSignupThunk.pending, (state)=>{
            state.user.loading = true
        })
        .addCase(userSignupThunk.rejected, (state)=>{
            state.user.loading = false
        })
        .addCase(userSignupThunk.fulfilled, (state, action)=>{
            state.user.loading = false
            toast.success(action.payload.message)
        })
        .addCase(postThunk.pending, (state)=>{
            state.listing.loading = true
        })
        .addCase(postThunk.rejected, (state)=>{
            state.listing.loading = false
        })
        .addCase(postThunk.fulfilled, (state, action)=>{
            state.listing.loading = false
            toast.success(action.payload.message)
            const newContent = action.payload.content
            state.listing.items = [...state.listing.items, newContent]

        })
        .addCase(getListingThunk.pending, (state)=>{
            state.listing.loading = true
        })
        .addCase(getListingThunk.rejected, (state)=>{
            state.listing.loading = false
        })
        .addCase(getListingThunk.fulfilled, (state, action)=>{
            state.listing.loading = false
            if(action.payload.contents.length >0){
                state.listing.items = action.payload.contents
            }
        })
        .addCase(deleteListingThunk.pending, (state)=>{
            state.listing.loading = true
        })
        .addCase(deleteListingThunk.rejected, (state)=>{
            state.listing.loading = false
        })
        .addCase(deleteListingThunk.fulfilled, (state, action)=>{
            state.listing.loading = false
            toast.success(action.payload.message)
            state.listing.items =  state.listing.items.filter((item)=> item._id !== action.payload.content._id)
        })
        .addCase(getSharedItemById.pending, (state)=>{
            state.listing.loading = true
        })
        .addCase(getSharedItemById.rejected, (state)=>{
            state.listing.loading = false
        })
        .addCase(getSharedItemById.fulfilled, (state,action)=>{
            state.listing.loading = false
            state.listing.items = [action.payload.content]
        })
        .addCase(getSharedItemByUser.pending, (state)=> {
            state.listing.loading = true
        })
        .addCase(getSharedItemByUser.rejected, (state)=> {
            state.listing.loading = false
        })
        .addCase(getSharedItemByUser.fulfilled, (state, action)=> {
            state.listing.loading = false
            state.listing.items = action.payload.content
        })
    }
})


const UserReducer = userSlice.reducer;
export const {authVerify, logout} = userSlice.actions;
export default UserReducer