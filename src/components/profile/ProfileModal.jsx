
import './ProfileModel.css'
import { ProfileImg } from '../photoupload/ProfileImg'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteFollow } from '../../services/followServices'
import { useContext } from 'react'
import { UserContext } from '../../views/ApplicationViews'

export const ProfileModal = ({following, followerUsers, followingUsers, setDeleteTrigger}) => {
    const navigate= useNavigate()
    const {currentUser}= useContext(UserContext)
    const {userId} = useParams()
    const handleClick = (event) => {
        event.preventDefault()
        
        navigate(`/collection/${event.target.dataset.id}`)
    }
    const handleUnfollow = (e) => {
        const findFollowing = following.find(follow => follow.followedUserId === parseInt(e.target.dataset.id))
        e.preventDefault()
        deleteFollow(findFollowing.id).then(()=> {
            setDeleteTrigger(prev => !prev)
        })
            
   
    }
       
    return (
        <div className="modal fade" id="tabModal" tabIndex="-1" aria-labelledby="tabModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="tabModalLabel">followers</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                    <button className="nav-link active " id="followers-tab" data-bs-toggle="tab" data-bs-target="#followers" type="button" role="tab" aria-controls="followers" aria-selected="true">
                        followers
                    </button>
                    </li>
                    <li className="nav-item" role="presentation">
                    <button className="nav-link border " id="following-tab" data-bs-toggle="tab" data-bs-target="#following" type="button" role="tab" aria-controls="following-tab" aria-selected="true">
                        following
                    </button>
                    </li>
                    
                </ul>

                
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="followers" role="tabpanel" aria-labelledby="home-tab">
                        {followerUsers.map(user => {
                            return (
                              
                                <div className='m-2 d-flex justify-content-between align-items-center' key={user.id}>
                                    <div className='d-flex align-items-center'>
                                    <span><ProfileImg profileImage={user?.profileImage} navPic={true}/></span>
                                    <span className='h5 ms-1'>{user.fullName}</span>
                                    </div>
                                    <span className=''>
                                        <button className='m-2 btn btn-primary'
                                            data-id ={user.id} 
                                           onClick={handleClick} >view collection</button> 
                                    </span>
                                </div>
                              
                            )
                        })}
                    </div>
                    <div className="tab-pane fade" id="following" role="tabpanel" aria-labelledby="following-tab">
                        {followingUsers.map(user => {
                            return (
                              
                                <div className='m-2 d-flex justify-content-between align-items-center' key={user.id}>
                                    <div className='d-flex align-items-center'>
                                    <span><ProfileImg profileImage={user?.profileImage} navPic={true}/></span>
                                    <span className='h5 ms-1'>{user.fullName}</span>
                                    </div>
                                    <span className=''>
                                        <button className='m-2 btn btn-primary'
                                            data-id ={user.id} 
                                           onClick={handleClick} >view collection</button> 
                                        {parseInt(userId) === currentUser &&
                                            <button className='m-2 btn btn-warning'
                                                data-id ={user.id} 
                                            onClick={handleUnfollow}  >unfollow</button>
                                        
                                        }
                                    </span>
                                </div>
                              
                            )
                        })}
                    </div>
                </div>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
    )
}