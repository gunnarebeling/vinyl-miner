import { useEffect, useState } from "react"
import { getUserById, updateUser } from "../../services/userService"
import { useNavigate } from "react-router-dom"

export const EditProfile = ({currentUser}) => {
    const [userInfo, setUserInfo] = useState({})
    const [newInfo , setNewInfo] = useState({fullName: ''})
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(currentUser).then(res => {
            const userobj = res[0]
            setUserInfo(userobj)
        })
    }, [currentUser])
    useEffect(() => {
        if(Object.keys(userInfo) !== 0){
            let copy = {...userInfo}
            setNewInfo(copy)

        }

    }, [userInfo])
    const handelSubmit = (event) => {
        event.preventDefault()
        let copy = {
            id: newInfo.id,
            fullName: newInfo.fullName,
            email: newInfo.email

        }
        updateUser(copy)
        
        
        navigate(`/profile/${newInfo.id}`)
    }
    
    
    return (
        <div>
            <div className="header text-center m-3">
                <header>Edit Profile</header>
            </div>
            <form className="edit-profile text-center">
                <fieldset>
                    <header className="text-decoration-underline m-3 h3">Full Name</header>
                    <input 
                    type="text" 
                    id="fullname"  
                    value={newInfo.fullName || ''}
                    onChange={(event) => {
                        let copy = {...newInfo}
                        copy.fullName = event.target.value
                        setNewInfo(copy)
                    }} />
                </fieldset>
                <fieldset>
                    <header className="text-decoration-underline m-3 h3">Email</header>
                    <input 
                    type="text"
                    id="email"   
                    value={newInfo.email || ''}
                    onChange={(event) => {
                        let copy = {...newInfo}
                        copy.email = event.target.value
                        setNewInfo(copy)
                    }} />
                </fieldset>
                <fieldset className="submit-button">
                    <button className="btn btn-primary m-3" onClick={handelSubmit}>Submit</button>
                </fieldset>
            </form>
        </div>
    )
}