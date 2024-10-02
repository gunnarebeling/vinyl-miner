/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVinylByUser } from "../../services/vinylServices"
import { VinylCard } from "./vinylcard"
import {motion} from 'framer-motion'

export const UsersVinyl = ({currentUser}) => {
    const [usersVinyl, setUsersVinyl] = useState([])
    const {userId} = useParams()
    const [handleRefresh, setHandleRefresh] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        getVinylByUser(userId).then(res =>{
            setUsersVinyl(res)
        }

        )
    }, [userId, handleRefresh])
    const refreshOnClick = () => {
        setHandleRefresh(prev => !prev)
    }
    const handleAddToCollection = (event) => {
        event.preventDefault()
        navigate('/NewVinyl')

    }
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity: 1}}
            transition={{duration: .3}}>
            <div className="header text-center d-flex justify-content-between m-3">
                {parseInt(userId) === currentUser ? (<><header className="align-self-center bodoni-moda-sc-title mx-auto">My Collection</header> <button className="btn btn-primary" onClick={handleAddToCollection}>+</button></>) : <header className="bodoni-moda-sc-title">{usersVinyl[0]?.user.fullName}'s Collection</header>}
            </div>
            <div className="collection-container justify-content-center border p-2 row">
                {usersVinyl?.map(vinyl => (
                    <VinylCard vinyl={vinyl} key={vinyl.id} refreshOnClick={refreshOnClick} generalView={true}/>
                ))}
            </div>
        </motion.div>  
    )
}