/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVinylByUser } from "../../services/vinylServices"
import { VinylCard } from "./vinylcard"
import {motion} from 'framer-motion'
import { ProfileImg } from "../photoupload/ProfileImg"
import { getUserById } from "../../services/userService"
import { deleteFollow, getFollowsbyCurrentUser, postFollow } from "../../services/followServices"
import { UserContext } from "../../views/ApplicationViews"

export const UsersVinyl = () => {
    const [usersVinyl, setUsersVinyl] = useState([])
    const {userId} = useParams()
    const [handleRefresh, setHandleRefresh] = useState(false)
    const [user, setUser] = useState({})
    const [followed, setFollowed] = useState(false)
    const [follows, setFollows] = useState([])
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        getVinylByUser(userId).then(res =>{
            setUsersVinyl(res)
        }      
        )
        getFollowsbyCurrentUser(currentUser).then( res => {
            setFollows(res)
        })  

        getUserById(userId).then((res => setUser(res[0])))

    }, [userId, handleRefresh, currentUser])

    useEffect(() => {
        getFollowsbyCurrentUser(currentUser).then( res => {
            setFollows(res)
        })  
    }, [currentUser, followed])

    useEffect(() => {
        setFollowed(follows.some(follow => follow.followedUserId === parseInt(userId)))
    }, [follows, userId])

    const refreshOnClick = () => {
        setHandleRefresh(prev => !prev)
    }

    const handleAddToCollection = (event) => {
        event.preventDefault()
        navigate('/NewVinyl')
    }

    const handleFollow = () => {
        const follow = follows.find(follow => follow.followedUserId === parseInt(userId))
        if (followed){
            deleteFollow(follow.id)
        }else{
            const followObj = {
                followingUserId: currentUser,
                followedUserId: parseInt(userId)
            }
            postFollow(followObj)
        }
        setFollowed(prev => !prev)
    }

    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity: 1}}
            transition={{duration: .3}}>
            <div className="header text-center d-flex justify-content-between m-3">
                {parseInt(userId) === currentUser ?( 
                    <>
                        <header className=" d-flex bodoni-moda-sc-title ">My Collection </header> 
                        <button className="btn btn-outline-primary" onClick={handleAddToCollection}>+</button>
                    </>) : 
                    <header className=" d-flex align-items-center bodoni-moda-sc-title">
                        <span className="m-3">
                            <ProfileImg 
                                navPic={true} 
                                profileImage={user.profileImage} 
                            />
                        </span>
                        <span className="text-center">
                            {usersVinyl[0]?.user.fullName}'s Collection 
                        </span>
                        <span className="ms-3">
                            <button 
                                className={followed ? "btn btn-primary" :"btn btn-outline-primary"} 
                                onClick={handleFollow}>{followed ? "unfollow" : "follow"}
                            </button>
                        </span> 
                    </header>
                }
            </div>
            <div className="collection-container justify-content-center border p-2 row">
                {usersVinyl?.map(vinyl => (
                    <VinylCard vinyl={vinyl} key={vinyl.id} refreshOnClick={refreshOnClick} generalView={true}/>
                ))}
            </div>
        </motion.div>  
    )
}