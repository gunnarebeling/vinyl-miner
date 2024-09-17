import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/NavBar/NavBar"
import { AllVinyl } from "../components/vinylViews/AllVinyl"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route 
                path="/"
                element={
                    <>
                        <NavBar/>
                        <Outlet/>
                    </>
                }>
                    <Route index element={<AllVinyl/>}/>


            </Route>
        </Routes>
    )
}