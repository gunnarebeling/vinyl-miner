
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../views/ApplicationViews"
import './VinylCard.css'
import { deleteVinyl } from "../../services/vinylServices"
import { getLikesByVinylId, postLike, UpdateLike } from "../../services/likesServices"
import { OverlayTrigger, Popover, PopoverBody, PopoverHeader } from "react-bootstrap"
import { VinylPopover } from "./VinylPopover"


export const VinylCard = ({vinyl, generalView}) => {
    
    const [likes, setLikes] = useState([])
    const [likesCount, setLikesCount] = useState(0)
    const {currentUser} = useContext(UserContext)
    const [showPopover, setShowPopover] = useState(false);
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
        navigate(`/collection/${vinyl.user.id}`)
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

    const handleTogglePopover = (e) => {
        e.preventDefault();
        setShowPopover(!showPopover); // Toggle the popover manually
      };
    
    
      const handleClickInsidePopover = (e) => {
        e.stopPropagation(); // Prevent closing the popover on clicking inside
      };
    
    return (
        <OverlayTrigger
        show={showPopover}
        trigger='click'
        placement="auto"
        rootClose={true} // Allow popover to close when clicking outside
        rootCloseEvent="click" // Specific event to listen for outside clicks
        onToggle={() => setShowPopover(false)} // Ensure closing when clicking outside
        overlay={
            <Popover id="popover-basic" onClick={handleClickInsidePopover}>
                <PopoverHeader className="popover-details" as="h3">{vinyl.albumName}</PopoverHeader>
                <PopoverBody>
                    <VinylPopover 
                        vinyl={vinyl} 
                        handleDelete={handleDelete} 
                        likesCount={likesCount} 
                        handleEdit={handleEdit} 
                        handleLike={handleLike} 
                        handleTrade={handleTrade} 
                        currentUser={currentUser} 
                        likes={likes} 
                        handleClick={handleClick}/>
                </PopoverBody>
            </Popover>
        }
        
        >
            <section className=" bg-secondary vinyl-card  m-3 border" onClick={handleTogglePopover} >
                <a
                href="#"
                role="button"
                tabIndex="0"
                className="text-decoration-none"
                onClick={(e) => e.preventDefault()}  
                >
                <div className={` vinyl `}>
                    <div>
                        <img src={`${vinyl.albumArt}`} alt={`album art`} className="img-fluid custom-img fixed-size"/>
                    </div> 
                    <div className="release-details d-flex flex-column ">
                        <div className="info ">
                            <div className="mx-1 d-flex justify-content-between  mb-1"><span >{vinyl.albumName}</span><span className="me-1 " style={{ whiteSpace: 'nowrap' }}><span>{likesCount}</span><span className="ms-1"><i className={` fa-solid  fa-heart likes-icon`}></i></span></span></div>
                            <div className="mx-1 mb-1"><span >{vinyl?.artist}</span></div>
                            <div className="mx-1 mb-1"><span>{vinyl.genre?.name}</span></div>
                            
                        </div>
                    
                    </div>
                </div>

            </a>
            </section>
        
        </OverlayTrigger>
            
    )
}