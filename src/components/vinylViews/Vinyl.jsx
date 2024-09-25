import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../views/ApplicationViews"
import './Vinyl.css'

export const Vinyl = ({vinyl, generalView}) => {
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()
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
    
    return (
                       
        <div className={`col-12 ${generalView ? 'col-md-6' : ''} mb-3`} key={vinyl?.id}>
            <div className='vinyl-container m-3 card  border-2  shadow m-1 d-flex flex-column'>
                <div className='row info' >
                    <div className=' col info flex-grow-1 d-flex flex-column '>
                        <section className='info-section title m-2 d-flex  flex-grow-1'>Title: {vinyl?.albumName}</section>
                        <section className='info-section artist m-2 d-flex flex-grow-1'>Artist : {vinyl?.artist}</section>
                        <section className='info-section genre m-2 d-flex flex-grow-1'>genre: {vinyl.genre?.name}</section>
                        <section className='info-section condition d-flex m-2 flex-grow-1'>condition: {vinyl.condition?.name}</section>
                        <section className='info-section user m-2 d-flex flex-grow-1 custom-link hover-icon' onClick={handleClick}>user: {vinyl.user?.fullName}</section>
                    </div>
                    <div className='image-container col m-2'>
                        <img src={`${vinyl.albumArt}`} alt={`album art`} className='img-fluid fixed-size'/>
                    </div>
                </div>
                    {generalView ?
                    (<div className='btn-container text-center mt-auto'>
                        <button className='m-2 btn btn-info'onClick={handleShowDetails}>Show Details</button>
                    </div>)
                    
                     : (<div className='btn-container text-center mt-auto' >
                        {(vinyl.userId === parseInt(currentUser)) ? <button className='m-2 btn btn-info' onClick={handleEdit}>edit</button> : <button className='m-2 btn btn-info'>like</button> }
                        
                       
                    </div>)
                    }
            </div>
        </div>
        
    
    )
}