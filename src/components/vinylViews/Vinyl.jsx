import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../views/ApplicationViews"
import './Vinyl.css'
import { deleteVinyl } from "../../services/vinylServices"
import { getLikesByVinylId, postLike, UpdateLike } from "../../services/likesServices"

export const Vinyl = ({vinyl, generalView}) => {
    const [likes, setLikes] = useState([])
    const [likesCount, setLikesCount] = useState(0)
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
    const getAndSetLikes = () => {
        getLikesByVinylId(vinyl.id).then(res => {
            setLikes(res)
        })
    }
    useEffect(() => {
        getAndSetLikes()
    }, [vinyl])

    useEffect(() => {
        const filteredLikes = likes.filter(likes => likes.liked)
        setLikesCount(filteredLikes.length)
    }, [likes])
    const handleClick = (event) => {
        event.preventDefault()
        navigate(`/profile/${vinyl.user.id}`)
    }
    const handleShowDetails = () => {
        navigate(`/details/${vinyl.id}`)
    }
    const handleEdit = () => {
        navigate(`/details/${vinyl.id}/edit`)
    }
    const handleDelete = () => {
        deleteVinyl(vinyl.id).then(() => {
            navigate(`/collection/${currentUser}`)
        })
    }
    const handleLike = () => {
        
        const likeObj = likes.find(like => like.userId == currentUser)
        if (likeObj) {
            UpdateLike(likeObj).then(()=> getAndSetLikes())

        }else{
            const obj = {
                vinylId: vinyl.id,
                userId: currentUser,
                liked: true
            }
            postLike(obj).then(()=> getAndSetLikes())

            
        }
    }
    const handleTrade = () =>{
        navigate(`/tradeform/${vinyl.id}`)
    }
    
    return (
                       
        <div className={`col-12 ${generalView ? 'col-md-6' : ''} mb-3`} key={vinyl?.id}>
            <div className='vinyl-container m-3 card  border-2  shadow m-1 d-flex flex-column'>
                <div className='row info' >
                    <div className=' col info  d-flex flex-column '>
                        <section className='info-section title m-2 d-flex  '>Title: {vinyl?.albumName}</section>
                        <section className='info-section artist m-2 name d-flex '>Artist : {vinyl?.artist}</section>
                        <section className='info-section genre m-2 d-flex '>genre: {vinyl.genre?.name}</section>
                        <section className='info-section condition d-flex m-2 '>condition: {vinyl.condition?.name}</section>
                        <section className='info-section user m-2 d-flex ' >user: <span onClick={handleClick}className="custom-link nav-link name px-1">{vinyl.user?.fullName}</span></section>
                        <section className='info-section condition d-flex m-2 '> likes: {likesCount} </section>
                    </div>
                    <div className='image-container col m-2'>
                        <img src={`${vinyl.albumArt}`} alt={`album art`} className='img-fluid fixed-size'/>
                    </div>
                </div>
                    {generalView ?
                    (<div className='btn-container text-center mt-auto'>
                        <button className='m-2 btn btn-primary'onClick={handleShowDetails}>Show Details</button>
                    </div>)
                    
                     : (<div className='btn-container text-center mt-auto' >
                        {(vinyl.userId === parseInt(currentUser)) ? <div><button className='m-2 btn btn-primary' onClick={handleEdit}>edit</button> <button className='m-2 btn btn-warning' onClick={handleDelete}>Delete</button></div> 
                        : 
                        <div>
                            <button className='m-2 btn btn-primary' onClick={handleLike}>like</button><button className='m-2 btn btn-warning' onClick={handleTrade}>Trade</button>
                        </div> }
                        
                       
                    </div>)
                    }
            </div>
        </div>
        
    
    )
}