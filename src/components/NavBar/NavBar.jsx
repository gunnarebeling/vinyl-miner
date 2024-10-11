import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'
import { useContext, useEffect, useState } from "react"
import { getUserById } from "../../services/userService"
import { ProfileImg } from "../photoupload/ProfileImg"
import { UserContext } from "../../views/ApplicationViews"

export const NavBar = () => {
    const [profilePhoto , setProfilePhoto] = useState({})
    const {photoSwap, currentUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(currentUser).then(res => {    
            setProfilePhoto(res[0])
        })
    }, [currentUser, photoSwap])

    return (
        <nav className="navbar nav navbar-dark nav border-bottom navbar-dark align-items-center ">
                <a className="navbar-brand m-2" href="#">
                    <img  
                        src="./vinyl_miners_logo.svg"  
                        alt="Logo" 
                        className="d-inline-block  text-center align-top"
                        href="#"
                    />
                </a>       
            <div className=" navbar justify-content-between">
                <ul className="d-flex align-items-center mx-auto">
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to='/' >All Vinyl</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to={`/collection/${currentUser}`} >My Collection</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to={`/trades`} >Trades</Link>
                    </li>
                    <li className="nav-item  align-items-center d-flex">
                        <div className="dropdown ">
                            <a className="btn  d-flex align-items-center nav-link custom-link" 
                                href="#" 
                                role="button" 
                                id="profile-dropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <ProfileImg profileImage={profilePhoto?.profileImage} navPic={true}/>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end " aria-labelledby="dropdownMenuLink">
                                <li>
                                     <Link className="dropdown-item" to={`/profile/${currentUser}`} >View Profile</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to={`/editprofile`}>Edit Profile</Link>
                                </li>
                                <li>
                                    {localStorage.getItem("vinyl_user") && 
                                        <section className="nav-item ms-auto ">
                                            <Link
                                            className="dropdown-item"
                                            to=""
                                            onClick={() => {
                                                localStorage.removeItem("vinyl_user")
                                                navigate("/login", { replace: true })
                                            }}
                                            >
                                            Logout
                                            </Link>
                                        </section>
                                    }
                                </li>
                            </ul>
                        </div> 
                    </li>
                </ul>
            </div>
        </nav>
    )
}