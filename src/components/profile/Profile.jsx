/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById } from "../../services/userService"
import {motion} from 'framer-motion'

export const Profile = ({currentUser}) => {
    const [user, setUser] = useState({})
    const {userId} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getUserById(userId).then(obj => {
            const userObj = obj[0]
            setUser(userObj)
        })
    }, [userId])
    const handleViewCollection = (event) => {
        event.preventDefault()
        navigate(`/collection/${user.id}`)
        
    }
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity: 1}}
            transition={{duration: .3}}>
            <div className="header text-center  m-3">
                {parseInt(userId) === currentUser ? <header className="bodoni-moda-sc-title">My Profile</header> : <header className="bodoni-moda-sc-title">{user?.fullName}'s Profile</header>}
            </div>
            <div className="d-flex justify-content-center">
                <div className="container bg-secondary rounded border text-center  m-4 ">
                    <div className=" ">
                        <p className="h3 text-decoration-underline">Name</p>
                        <h1 className="h3 ">{user.fullName}</h1>
                    </div>
                    {parseInt(userId) === currentUser && 
                        <div className="email">
                            <p className="h3 text-decoration-underline">email</p>
                            <h1 className="h3">{user.email}</h1>
                        </div>
                    }
                    <div className="vinyl-amount m-5">
                        
                        <h1 className="h3">{user.vinyls?.length} vinyls in collection</h1>
                    </div>
                    <div className="mb-3">
                        {parseInt(userId) === currentUser? <button className="btn btn-primary" onClick={(event) => {
                            event.preventDefault()
                            navigate('/editprofile')
                        }}>edit profile</button> : <button className="btn btn-primary" onClick={handleViewCollection}>view collection</button>}
                    </div>
                </div>
            </div>
            
        </motion.div>
    )
}