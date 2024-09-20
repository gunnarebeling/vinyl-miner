import { useParams } from "react-router-dom"
import { Vinyl } from "./Vinyl"
import { useEffect, useState } from "react"
import {  getVinylById } from "../../services/vinylServices"

export const VinylDetails = () => {
    const [vinylObj, setVinylObj] = useState({})
    const {vinylId} = useParams()
    useEffect(() => {
       getVinylById(parseInt(vinylId)).then( res => {
        setVinylObj(res)
       })
    }, [vinylId])

    return (
        <>
       
       <div className="header-container m-3">
            <header className="display-6 text-center">Details</header>
        </div>
        <Vinyl vinyl={vinylObj} generalView={false}/>
       
        </>
    )
}