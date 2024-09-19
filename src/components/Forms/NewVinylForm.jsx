import { useEffect, useState } from "react"
import { getGenres } from "../../services/genreService"
import { getConditions } from "../../services/conditionsservices"
import { postVinyl } from "../../services/vinylServices"
import { useNavigate } from "react-router-dom"

export const NewVinylForm = ({currentUser}) => {
    
    const [genres, setGenres] = useState([])
    const [conditions, setConditions] = useState([])
    const [formValues, setFormValues] = useState({albumName:"", artist: "", conditionId: 1, genreId: 1, albumArt: ""})
    const navigate = useNavigate()
    useEffect(() => {
        getConditions().then(res => {
            setConditions(res)
        })
        getGenres().then(res => {
            setGenres(res)
        })
        
    }, [])
    const handelSubmit = (event) => {
        event.preventDefault()
        let copy = {...formValues}
        copy.userId = currentUser
        postVinyl(copy)
        navigate(`/collection/${currentUser}`)
    }
    
    return (
        <div>
            <div className="header text-center m-3">
                <header>add to collection</header>
            </div>
            <div className="form-container border m-3 shadow text-center">
                <form>
                    <fieldset>
                        <p className="text-decoration-underline m-3 h3">Title</p>
                        <input 
                        type="text"
                        placeholder="album title"
                        value={formValues.albumName}
                        onChange={(event) => {
                            let copy = {...formValues}
                            copy.albumName = event.target.value
                            setFormValues(copy)
                        }} />
                    </fieldset>
                    <fieldset>
                        <p className="text-decoration-underline m-3 h3">Artist</p>
                        <input 
                        type="text"
                        placeholder="album artist"
                        value={formValues.artist}
                        onChange={(event) => {
                            let copy = {...formValues}
                            copy.artist = event.target.value
                            setFormValues(copy)
                        }} />
                    </fieldset>
                    <fieldset>
                        <p className="text-decoration-underline m-3 h3">Album Art</p>
                        <input 
                        type="text"
                        placeholder="album Art URL"
                        value={formValues.albumArt}
                        onChange={(event) => {
                            let copy = {...formValues}
                            copy.albumArt = event.target.value
                            setFormValues(copy)
                        }} />
                    </fieldset>
                    <fieldset className="genre-dropdown m-3">
                    <p className="text-decoration-underline m-3 h3">Genre</p>
                        <select 
                        name="genre" 
                        value={formValues.genreId} 
                        id="genre"
                        onChange={ event => {
                            let copy = {...formValues}
                            copy.genreId = parseInt(event.target.value)
                            setFormValues(copy)
                        }}>
                            {genres?.map(genre => {
                                return (<option value={`${genre.id}`} key={genre.id}>{genre.name}</option>)
                            })}
                        </select>
                    </fieldset>
                    <fieldset className="condition-dropdown m-3">
                    <p className="text-decoration-underline m-3 h3">Condition</p>
                        <select 
                        name="condition" 
                        value={formValues.conditionId} 
                        id="condition"
                        onChange={ event => {
                            let copy = {...formValues}
                            copy.conditionId = parseInt(event.target.value)
                            setFormValues(copy)
                        }}>
                            {conditions?.map(condition => {
                                return (<option value={`${condition.id}`} key={condition.id}>{condition.name}</option>)
                            })}
                        </select>
                    </fieldset>
                    <fieldset className="submit-button">
                        <button className="btn btn-primary m-3" onClick={handelSubmit}>Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}