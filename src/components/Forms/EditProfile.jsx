import { useEffect, useReducer, useState } from "react"
import { getUserById, updateUser } from "../../services/userService"
import { useNavigate } from "react-router-dom"
import { formReducer } from "../../services/reduceServices"

export const EditProfile = ({currentUser}) => {
    const [userInfo, setUserInfo] = useState({})
    const [newInfo , dispatch] = useReducer(formReducer, {} ) 
    const navigate = useNavigate()

    useEffect(() => {
        getUserById(currentUser).then(res => {
            const userobj = res[0]
            setUserInfo(userobj)
        })
    }, [currentUser])
    useEffect(() => {
        if(Object.keys(userInfo) !== 0){
           dispatch({type: 'setNewInfo', payload: userInfo})

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
                    id="fullName"  
                    value={newInfo.fullName || ''}
                    onChange={(event) => {
                        const { id , value } = event.target
                        
                        dispatch({
                            type: 'handleInput',
                            field: id,
                            value: value    
                        })
                    }} />
                </fieldset>
                <fieldset>
                    <header className="text-decoration-underline m-3 h3">Email</header>
                    <input 
                    type="text"
                    id="email"   
                    value={newInfo.email || ''}
                    onChange={(event) => {
                        const {id , value } = event.target
                        dispatch({
                            type: 'handleInput',
                            field: id,
                            value: value
                        })
                    }} />
                </fieldset>
                <fieldset className="submit-button">
                    <button className="btn btn-primary m-3" onClick={handelSubmit}>Submit</button>
                </fieldset>
            </form>
        </div>
    )
}