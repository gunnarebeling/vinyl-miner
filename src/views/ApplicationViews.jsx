import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/NavBar/NavBar"
import { AllVinyl } from "../components/vinylViews/AllVinyl"
import { UsersVinyl } from "../components/vinylViews/UsersVinyl"
import { createContext, useEffect, useState } from "react"
import { Profile } from "../components/profile/Profile"
import { NewVinylForm } from "../components/Forms/NewVinylForm"
import { EditProfile } from "../components/Forms/EditProfile"
import { EditVinylForm } from "../components/Forms/EditVinylForm"
import { VinylDetails } from "../components/vinylViews/VinylDetails"
import { NewTrade } from "../components/Forms/NewTrade"
import { TradesHomeView } from "../components/trades/tradesHomeview"



export const UserContext = createContext()
export const ApplicationViews = () => {
    const [currentUser, setCurrentUser]= useState(0)

    useEffect(() => {
        const currentUserObj = localStorage.getItem('vinyl_user')
        const parsedCurrentUser = JSON.parse(currentUserObj)
        const currentUserId = parseInt(parsedCurrentUser.id)
        setCurrentUser(currentUserId)
    }, [])
    return (
        <UserContext.Provider value={{currentUser}}>
            <Routes>
                <Route 
                    path="/"
                    element={
                        <>
                            <NavBar currentUser={currentUser}/>
                                
                                <div>
                                    <Outlet/>
                                </div>
                                
                        </>
                    }>
                        <Route index element={<AllVinyl/>}/>
                        <Route path="/collection/:userId" element={<UsersVinyl currentUser={currentUser}/>}/>
                        <Route path="/profile/:userId" element={<Profile currentUser={currentUser}/>}/>
                        <Route path="NewVinyl" element={<NewVinylForm currentUser={currentUser}/>}/>
                        <Route path="editprofile" element={<EditProfile currentUser={currentUser}/>}/>
                        <Route path='details/:vinylId'>
                            <Route index element={<VinylDetails/>}/>
                            <Route path="edit" element={<EditVinylForm/>}/>

                        </Route>
                        <Route path="/tradeform/:tradeInitVinylId" element={<NewTrade/>} />
                        <Route path="trades" element={<TradesHomeView/>}/>


                </Route>
            </Routes>
        </UserContext.Provider>
    )
}