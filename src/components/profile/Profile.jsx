/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById } from "../../services/userService"

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
        <>
            <div className="header text-center  m-3">
                {parseInt(userId) === currentUser ? <header>My Profile</header> : <header>{user?.fullName}'s Profile</header>}
            </div>
            <div className="userinfo text-center p-4 m-4">
                <div className="name">
                    <p className="h3 text-decoration-underline">Name</p>
                    <h1 className="h3">{user.fullName}</h1>
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
                <div>
                    {parseInt(userId) === currentUser? <button className="btn btn-primary" onClick={(event) => {
                        event.preventDefault()
                        navigate('/editprofile')
                    }}>edit profile</button> : <button className="btn btn-primary" onClick={handleViewCollection}>view collection</button>}
                </div>
            </div>
            
        </>
    )
}