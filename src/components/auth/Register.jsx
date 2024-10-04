import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"
import { UploadWidget } from "../photoupload/UploadWidget"
import { ProfileImg } from "../photoupload/ProfileImg"

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    profileImage: ""
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
    }

    createUser(newUser).then((createdUser) => {
      // eslint-disable-next-line no-prototype-builtins
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "vinyl_user",
          JSON.stringify({
            id: createdUser.id,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Vynl Miner</h1>
        <h2>Please Register</h2>
        <div className="d-flex w-100 align-items-center justify-content-center ">
          <fieldset className=" me-3">
            <ProfileImg profileImage={user.profileImage} navPic={false} />
            <UploadWidget register={true} setUser={setUser} user={user}/>
          </fieldset>
          <div className='mx-3 text-center'>
            <fieldset className="auth-fieldset mb-3">
              <div>
                <input
                  onChange={updateUser}
                  type="text"
                  id="fullName"
                  className="auth-form-input"
                  placeholder="Enter your name"
                  required
                  autoFocus
                />
              </div>
            </fieldset>
            <fieldset className="auth-fieldset">
              <div>
                <input
                  onChange={updateUser}
                  type="email"
                  id="email"
                  className="auth-form-input"
                  placeholder="Email address"
                  required
                />
              </div>
            </fieldset>
            
          </div>
        </div>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Register</button>
            </div>
          </fieldset>
      </form>
    </main>
  )
}
