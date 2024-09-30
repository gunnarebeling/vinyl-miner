import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'

export const NavBar = ({currentUser}) => {
    const navigate = useNavigate()
    return (
        <nav className="navbar nav navbar-dark nav border-bottom navbar-dark align-items-center ">
                <a className="navbar-brand m-2" href="#">
                    <img  src="./vinyl_miners_logo.svg"  alt="Logo" className="d-inline-block  text-center align-top" href="#"/>
                </a>
    

                
            <div className=" navbar justify-content-between">
                <ul className="d-flex  mx-auto">
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to='/' >All Vinyl</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to={`/collection/${currentUser}`} >My Collection</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to={`/profile/${currentUser}`} >My Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link custom-link" to={`/trades`} >Trades</Link>
                    </li>
                
                    </ul>
                    {localStorage.getItem("vinyl_user") ? (
                        <li className="nav-item ms-auto">
                            <Link
                            className="nav-link"
                            to=""
                            onClick={() => {
                                localStorage.removeItem("vinyl_user")
                                navigate("/login", { replace: true })
                            }}
                            >
                            Logout
                            </Link>
                        </li>
                        ) : (
                        ""
                        )}
            </div>
        </nav>
    )
}