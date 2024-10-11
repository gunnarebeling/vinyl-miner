import { useContext, useEffect, useState } from "react"
import { getGenres } from "../../services/genreService"
import { getConditions } from "../../services/conditionsservices"
import { postVinyl } from "../../services/vinylServices"
import { useNavigate } from "react-router-dom"
import { searchAlbum } from "../../services/spotifyApi"
import { VinylCard } from "../vinylViews/vinylcard"
import { UserContext } from "../../views/ApplicationViews"

export const NewVinylForm = () => {
    
    const [genres, setGenres] = useState([])
    const [conditions, setConditions] = useState([])
    const [formValues, setFormValues] = useState({albumName:"", artist: "", conditionId: 1, genreId: 1, albumArt: ""})
    const {currentUser} = useContext(UserContext)
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

    const handleSpotifySearch =  async (event) => {
        event.preventDefault()
        const spotifyResult = await searchAlbum(formValues.artist, formValues.albumName)
        let copy = {...formValues}
        copy.albumName = spotifyResult?.albumName
        copy.artistName = spotifyResult?.artistName 
        copy.albumArt = spotifyResult?.image
        copy.audioSample = spotifyResult?.audioSample
        setFormValues(copy)
    }
    
    return (
        <div>
            <div className="header text-center m-3">
                <header>add to collection</header>
            </div>
            <div  className="d-flex justify-content-center" style={{display: !formValues.albumName && 'none'}}>
                <VinylCard vinyl={formValues}/>
            </div>
            <div className="d-flex justify-content-center p-3 ">
                <form className="form-container container bg-secondary rounded border  m-4 ">
                    <fieldset>
                        <p className="mt-3 h3">Title</p>
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
                        <p className="mt-3 h3">Artist</p>
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
                    <div className="search-spotify mt-2">
                        <fieldset>
                            <button className="btn btn-spotify pill" onClick={handleSpotifySearch}>search spotify</button>
                        </fieldset>
                    </div>
                    <fieldset>
                        <p className="mt-3 h3">Album Art</p>
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
                    <fieldset className="genre-dropdown ">
                    <p className="mt-3 h3">Genre</p>
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
                    <fieldset className="condition-dropdown">
                    <p className="mt-3 h3">Condition</p>
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
                    <fieldset className="submit-button text-center">
                        <button className="btn btn-primary m-3" onClick={handelSubmit}>Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}