import { useContext, useEffect, useReducer, useState } from "react"
import { getUserById, updateUser } from "../../services/userService"
import { useNavigate } from "react-router-dom"
import { formReducer } from "../../services/reduceServices"
import { UploadWidget } from "../photoupload/UploadWidget"
import { ProfileImg } from "../photoupload/ProfileImg"
import { UserContext } from "../../views/ApplicationViews"

export const EditProfile = ({currentUser}) => {
    const [userInfo, setUserInfo] = useState({})
    const [newInfo , dispatch] = useReducer(formReducer, {} ) 
    const navigate = useNavigate()
    const {setPhotoSwap} = useContext(UserContext)

    useEffect(() => {
        getUserById(currentUser).then(res => {
            const userobj = res[0]
            setUserInfo(userobj)
        })
    }, [currentUser])
    useEffect(() => {
        if(userInfo){
           dispatch({type: 'setNewInfo', payload: userInfo})

        }

    }, [userInfo])
    const handelSubmit = (event) => {
        event.preventDefault()
        let copy = {
            id: newInfo.id,
            fullName: newInfo.fullName,
            email: newInfo.email,
            profileImage: newInfo.profileImage

        }
        updateUser(copy).then(()=>{
            setPhotoSwap(prev => !prev)
            
        } 
         ).then(() => {
            navigate(`/profile/${newInfo.id}`)
            
         })
        
        
    }
    
    
    return (
        <div>
            <div className="header text-center m-3">
                <header>Edit Profile</header>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <ProfileImg profileImage={newInfo.profileImage} alt="profile image"/>
                <UploadWidget dispatch={dispatch} register={false}/>
            </div>
            <div className="d-flex justify-content-center p-3 ">
                <form className="form-container container bg-secondary rounded border  m-4 ">
                    <fieldset className="border-bottom">
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
                        className="mb-3"  
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
                    </fieldset>
                </form>
            </div>
                <div className="text-center">
                    <button className="btn btn-outline-primary m-3" onClick={handelSubmit}>Submit</button>
                </div>
        </div>
    )
}