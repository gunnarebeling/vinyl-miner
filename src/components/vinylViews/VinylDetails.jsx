import { useParams } from "react-router-dom"
import { Vinyl } from "./Vinyl"
import { useEffect, useState } from "react"
import {  getVinylById } from "../../services/vinylServices"
import { VinylCard } from "./vinylcard"

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
            <header className="display-6 bodoni-moda-sc-title text-center">Details</header>
        </div>
        <div className=" container px-4 mx-5">
        <VinylCard vinyl={vinylObj} generalView={false}/>
        </div>
       
        </>
    )
}