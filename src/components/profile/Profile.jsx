/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getALLUsers, getUserById } from "../../services/userService"
import {motion} from 'framer-motion'
import { ProfileImg } from "../photoupload/ProfileImg"
import { getFollowersbyCurrentUser, getFollowsbyCurrentUser } from "../../services/followServices"
import { ProfileModal } from "./profileModal"


export const Profile = ({currentUser}) => {
    const [user, setUser] = useState({})
    const {userId} = useParams()
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const navigate = useNavigate()
    const [followingUsers , setFollowingUsers] = useState([])
    const [followerUsers , setFollowerUsers] = useState([])

    useEffect(() => {
        getALLUsers().then(res => {
            let filteredFollowingUsers = []
            let filteredFollowerUsers = []
             res.forEach(user => {
                if (followers) {
                    followers.forEach(follow => {
                        if (follow.followingUserId === user.id) {
                            filteredFollowerUsers.push(user)
                        }
                    })
                    
                }
                if (following) {
                    following.forEach(follow => {
                        if (follow.followedUserId === user.id) {
                            filteredFollowingUsers.push(user)
                        }
                    })
                }
            })
            setFollowerUsers(filteredFollowerUsers)
            setFollowingUsers(filteredFollowingUsers)
        })}, [followers, following])
    useEffect(() => {
        getUserById(userId).then(obj => {
            const userObj = obj[0]
            setUser(userObj)
        })
       
    }, [userId])

    useEffect(() => {
        getFollowersbyCurrentUser(parseInt(userId)).then(res => {
            setFollowers(res)
        })
        getFollowsbyCurrentUser(parseInt(userId)).then(res => {
            setFollowing(res)
        })
    } , [userId])
    const handleViewCollection = (event) => {
        event.preventDefault()
        navigate(`/collection/${user.id}`)
        
    }

    const showTab = (tab) => {
        const tabModal = document.getElementById('tabModal');
        const followersTab = new bootstrap.Tab(document.getElementById('followers-tab'));
        const followingTab = new bootstrap.Tab(document.getElementById('following-tab'));

        if (tab === 'followers') {
            followersTab.show();
        } else {
            followingTab.show();
        }
    };
    return (
        <motion.div
            initial={{opacity:0}}
            animate={{opacity: 1}}
            transition={{duration: .3}}>
            
            
            <div className="header text-center  m-3">
                {parseInt(userId) === currentUser ? <header className="bodoni-moda-sc-title">My Profile</header> : <header className="bodoni-moda-sc-title">{user?.fullName}'s Profile</header>}
            </div>
            <div className="d-flex mt-5 justify-content-center mb-3">
                <ProfileImg profileImage={user?.profileImage}/>
            </div>
            <div className=" text-center">
                <h1 className="h3 ">{user.fullName}</h1>
            </div>
            <div className="stats d-flex justify-content-center">
                <div className="followers d-flex text-center flex-column">
                    <span>{followers.length}</span>
                    <span><button className="followers-button" data-bs-toggle="modal" data-bs-target="#tabModal" onClick={() => showTab('followers')}>followers</button></span>
                </div>
                <div className="following d-flex text-center flex-column">
                    <span>{following.length}</span>
                    <span><button className="following-button" data-bs-toggle="modal" data-bs-target="#tabModal" onClick={() => showTab('following')}>following</button></span>
                </div>
                <div className="collection d-flex text-center flex-column">
                    <span>{user.vinyls?.length}</span>
                    <span><button>collection</button></span>
                </div>
                


            <ProfileModal userId={userId} followingUsers={followingUsers} followerUsers={followerUsers} setFollowers={setFollowers} setFollowing={setFollowing}/>
               
                
            </div>
            <div className="d-flex justify-content-center bg-secondary border mt-5 container align-items-center">
                <div className="container d-flex flex-column align-items-center rounded  text-center  m-2 ">
                    {parseInt(userId) === currentUser && 
                        <div className="email">
                            <p className=" text-decoration-underline">email</p>
                            <h1 className="">{user.email}</h1>
                        </div>
                    }
                    <div className="vinyl-amount mt-4">
                        
                        <h1 className="h3">{user.vinyls?.length} vinyls in collection</h1>
                    </div>
                </div>
            </div>
                    <div className="m-3 text-center">
                        {parseInt(userId) === currentUser? 
                            <button 
                                className="btn btn-outline-primary" 
                                onClick={(event) => 
                                    {event.preventDefault()
                                    navigate('/editprofile')}}
                            >edit profile</button> : 
                            <button 
                                className="btn btn-outline-primary" 
                                onClick={handleViewCollection}>view collection</button>
                        }
                    </div>
            
        </motion.div>
    )
}