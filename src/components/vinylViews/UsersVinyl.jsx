import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getVinylByUser } from "../../services/vinylServices"
import { Vinyl } from "./Vinyl"

export const UsersVinyl = ({currentUser}) => {
    const [usersVinyl, setUsersVinyl] = useState([])
    const {userId} = useParams()
    useEffect(() => {
        getVinylByUser(userId).then(res =>{
            setUsersVinyl(res)
        }

        )
    }, [userId])
    return (
        <>
            <div className="header text-center m-3">
                {parseInt(userId) === currentUser ? <header>My Collection</header> : <header>{usersVinyl[0]?.user.fullName} Collection</header>}
            </div>
            <div className="collection-container border p-2 row">
                {usersVinyl?.map(vinyl => (
                    <Vinyl vinyl={vinyl} key={vinyl.id}/>
                ))}

            </div>
        </>
    )
}