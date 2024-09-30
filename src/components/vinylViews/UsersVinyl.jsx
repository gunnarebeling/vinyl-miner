/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVinylByUser } from "../../services/vinylServices"
import { Vinyl } from "./Vinyl"

export const UsersVinyl = ({currentUser}) => {
    const [usersVinyl, setUsersVinyl] = useState([])
    const {userId} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getVinylByUser(userId).then(res =>{
            setUsersVinyl(res)
        }

        )
    }, [userId])
    const handleAddToCollection = (event) => {
        event.preventDefault()
        navigate('/NewVinyl')

    }
    return (
        <>
            <div className="header text-center d-flex justify-content-between m-3">
                {parseInt(userId) === currentUser ? (<><header className="align-self-center bodoni-moda-sc-title mx-auto">My Collection</header> <button className="btn btn-primary" onClick={handleAddToCollection}>+</button></>) : <header className="bodoni-moda-sc-title">{usersVinyl[0]?.user.fullName}'s Collection</header>}
            </div>
            <div className="collection-container border p-2 row">
                {usersVinyl?.map(vinyl => (
                    <Vinyl vinyl={vinyl} key={vinyl.id} generalView={true}/>
                ))}

            </div>
        </>
    )
}