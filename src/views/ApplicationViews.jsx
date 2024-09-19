import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/NavBar/NavBar"
import { AllVinyl } from "../components/vinylViews/AllVinyl"
import { UsersVinyl } from "../components/vinylViews/UsersVinyl"
import { useEffect, useState } from "react"
import { Profile } from "../components/profile/Profile"
import { NewVinylForm } from "../components/Forms/NewVinylForm"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser]= useState(0)

    useEffect(() => {
        const currentUserObj = localStorage.getItem('vinyl_user')
        const parsedCurrentUser = JSON.parse(currentUserObj)
        const currentUserId = parseInt(parsedCurrentUser.id)
        setCurrentUser(currentUserId)
    }, [])
    return (
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <NavBar currentUser={currentUser}/>
                        <Outlet/>
                    </>
                }>
                    <Route index element={<AllVinyl/>}/>
                    <Route path="/collection/:userId" element={<UsersVinyl currentUser={currentUser}/>}/>
                    <Route path="/profile/:userId" element={<Profile currentUser={currentUser}/>}/>
                    <Route path="NewVinyl" element={<NewVinylForm/>}/>


            </Route>
        </Routes>
    )
}