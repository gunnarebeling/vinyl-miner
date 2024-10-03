import { useEffect, useState } from "react"

export const VinylPopover = ({likesCount, vinyl, handleEdit, handleDelete, handleLike, handleTrade, currentUser, likes, handleClick}) => {
    const [liked , setLiked] = useState(false)
    useEffect(() => {
        const filteredLikes = likes.find(like => like.userId === currentUser)
        
            setLiked(filteredLikes?.liked)
        
    }, [likes, currentUser])
    return (
        <div className="popover-details">
             <div className="mx-1 d-flex align-items-center m-1"><span className="popover-details">Owner: </span><span onClick={handleClick}className="owner-link name px-1">{vinyl.user?.fullName}</span></div>
            <div className="mx-1 m-1"><span className="popover-details">condition: {vinyl.condition?.name}</span></div>
            {(vinyl.userId === parseInt(currentUser)) ? 
                <div><button className='m-2 btn btn-primary' 
                onClick={handleEdit}>edit</button> 
                <button className='m-2 btn btn-warning' 
                onClick={handleDelete}>Delete</button></div> 
                            : 
                            <div>
                                <div className="d-flex justify-content-center align-items-center bg-white  rounded">
                                    <div className=" likes-count m-1 pb-1">({likesCount})</div>
                                    <div onClick={handleLike} className="me-2 ">
                                        <i className={`${liked ? "fa-solid" : "fa-regular"} fa-2x fa-heart like-icon`}></i>
                                    </div>
                                    <button className='m-2 btn btn-warning' onClick={handleTrade}>Trade</button>
                                </div>
                            </div> }
        </div>
    )
}