import { useEffect, useState } from "react"
import { getGenres } from "../../services/genreService"

export const FilterBar = ({setFilteredVinyl, allVinyl}) => {
    const [genres , setGenres] = useState([])
    const [filterValues, setFilterValues] = useState({genre: 0, text:""})

    useEffect(() => {
        getGenres().then(genreArray => {
            setGenres(genreArray)
        })
    }, [])
    const handleGenreChange = (event) => {
        const copy = {...filterValues}
        copy.genre = parseInt(event.target.value)
        setFilterValues(copy)
    }
    const handleTextSearch = (event) => {
        let copy  = {...filterValues}
        copy.text = event.target.value
        setFilterValues(copy)
    }
    useEffect(() => {
        console.log("allVinyl",allVinyl); 
        let filtercopy = [...allVinyl]
        console.log("filterValues",filterValues);
        console.log("filtercopy",filtercopy); 

        if (!filterValues.genre && !filterValues.text) {
           filtercopy = [...allVinyl] 
           
        }
        if(filterValues.genre !== 0){
            filtercopy =filtercopy.filter(vinyl => vinyl.genreId === parseInt(filterValues.genre))
        }
        if(filterValues.text){
            filtercopy = filtercopy.filter(vinyl => ((vinyl.albumName.toLowerCase().includes(filterValues.text.toLocaleLowerCase())) || vinyl.artist.toLowerCase().includes(filterValues.text.toLocaleLowerCase()) ))
        }
        const newFilteredVinyl= filtercopy.reverse();
        console.log("newFilteredVinyl",newFilteredVinyl);
        setFilteredVinyl(newFilteredVinyl); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterValues, allVinyl])
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center py-2 px-4">
                <div className="genre-dropdown d-flex">
                <label  htmlFor="genre" name="genre-dropdown-label" className="m-2">genre:</label>
                    <select 
                        id="genre"
                        name="genre"
                        onChange={handleGenreChange}
                        value={filterValues.genre}
                        className="" >
                        <option value= '0'>all</option>
                        {genres.map(genre => {
                            return (
                                <option key={genre.id}
                                value={genre.id}
                                >{genre.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="text-search">
                    <input 
                    type="text"
                    placeholder="search"
                    value={filterValues.text}
                    onChange={handleTextSearch} />
                </div>

            </div>
        </div>
    )
}