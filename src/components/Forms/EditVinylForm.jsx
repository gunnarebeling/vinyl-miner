import { useContext, useEffect, useReducer, useState } from "react"
import { formReducer } from "../../services/reduceServices"
import { getVinylById, updateVinyl } from "../../services/vinylServices"
import { useNavigate, useParams } from "react-router-dom"
import { getGenres } from "../../services/genreService"
import { getConditions } from "../../services/conditionsservices"
import "./forms.css"
import { UserContext } from "../../views/ApplicationViews"


export const EditVinylForm = () => {
    const [vinylInfo , setVinyInfo] = useState({})
    const [editedVinyl, dispatch] = useReducer(formReducer, {})
    const [genres, setGenres] = useState([])
    const [conditions, setConditions] = useState([])
    const {vinylId} = useParams()
    const navigate = useNavigate()
    const {currentUser} =useContext(UserContext)
    useEffect(() => {
        getVinylById(vinylId).then(res => {
            setVinyInfo(res)
        })
        getGenres().then(res => {
            setGenres(res)
        })
        getConditions().then(res => {
            setConditions(res)
        })
    }, [vinylId])
    useEffect(() => {
        dispatch({type:'setNewInfo', payload: vinylInfo})
    }, [vinylInfo])

    const handelSubmit = (event) => {
        event.preventDefault()
        const copy = {
            id: editedVinyl.id,
            albumName: editedVinyl.albumName,
            artist: editedVinyl.artist,
            conditionId: editedVinyl.conditionId,
            genreId: editedVinyl.genreId,
            albumArt: editedVinyl.albumArt,
            userId: editedVinyl.userId
        }
        updateVinyl(copy)
        navigate(`/collection/${currentUser}`)
    }

    return (

        <div >
            <div className="header text-center m-3">
                <header>Edit Vinyl</header>
            </div>
            <div className="d-flex justify-content-center p-3 ">
                <form className="form-container container bg-secondary rounded border  m-4 ">
                    <fieldset className=" ">
                        <header className=" mt-3 h3">Artist</header>
                        <input 
                        type="text" 
                        id="artist"  
                        value={editedVinyl.artist || ''}
                        onChange={(event) => {
                            const { id , value } = event.target
                            
                            dispatch({
                                type: 'handleInput',
                                field: id,
                                value: value    
                            })
                        }} />
                    </fieldset>
                    <hr />

                    <fieldset className=" ">
                        <header className=" mt-3 h3">Album Title</header>
                        <input 
                        type="text"
                        id="albumName"   
                        value={editedVinyl.albumName || ''}
                        onChange={(event) => {
                            const {id , value } = event.target
                            dispatch({
                                type: 'handleInput',
                                field: id,
                                value: value
                            })
                        }} />
                    </fieldset>
                    <hr />
                    <fieldset className=" ">
                        <header className=" mt-3 h3">Album Art</header>
                        <input 
                        type="text"
                        id="albumArt"   
                        value={editedVinyl.albumArt || ''}
                        onChange={(event) => {
                            const {id , value } = event.target
                            dispatch({
                                type: 'handleInput',
                                field: id,
                                value: value
                            })
                        }} />
                    </fieldset>
                    <hr />
                    <fieldset className="">
                        <header className=" mt-3 h3">genre</header>
                        <select 
                            name="genre"
                            id="genreId"
                            value={editedVinyl.genreId || ''}
                            onChange={(event) =>{
                                const {id, value} = event.target
                                dispatch({
                                    type: 'handleInput',
                                    field: id,
                                    value: parseInt(value)
                                })
                            }}>
                                {genres.map(genre => {
                                    return(
                                        <option 
                                        value={genre.id}
                                        key={genre.id}
                                        id="genreId"
                                        >
                                            {genre.name}
                                        </option>
                                        )
                                })}
                                
                        </select>
                    </fieldset>
                    <hr />
                    <fieldset className=" ">
                        <header className=" mt-3 h3">Condition</header>
                        <select 
                            name="condition"
                            id="conditionId"
                            value={editedVinyl.conditionId || ''}
                            onChange={(event) =>{
                                const {id, value} = event.target
                                dispatch({
                                    type: 'handleInput',
                                    field: id,
                                    value: parseInt(value)
                                })
                            }}>
                                {conditions.map(condition => {
                                    return(
                                        <option 
                                        value={condition.id}
                                        key={condition.id}
                                        >
                                            {condition.name}
                                        </option>
                                        )
                                })}
                                
                        </select>
                    </fieldset>
                    <fieldset className="submit-button text-center">
                        <button className="btn btn-primary  m-3" onClick={handelSubmit}>Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}