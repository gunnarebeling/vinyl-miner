import { Link, useNavigate } from "react-router-dom"
import './NavBar.css'

export const NavBar = ({currentUser}) => {
    const navigate = useNavigate()
    return (
        <ul className="nav ">
            <li className="nav-item">
                <Link className="nav-link" to='/' >All Vinyl</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/collection/${currentUser}`} >My Collection</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/profile/${currentUser}`} >My Profile</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/trades`} >Trades</Link>
            </li>
           
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
        </ul>
    )
}