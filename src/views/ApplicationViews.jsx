import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/NavBar/NavBar"
import { AllVinyl } from "../components/vinylViews/AllVinyl"
import { UsersVinyl } from "../components/vinylViews/UsersVinyl"
import { useEffect, useState } from "react"

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
                    


            </Route>
        </Routes>
    )
}