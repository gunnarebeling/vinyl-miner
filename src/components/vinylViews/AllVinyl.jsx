import { useEffect, useState } from 'react'
import './Vinyl.css'
import { getAllVinyl } from '../../services/vinylServices'
import { FilterBar } from './FilterBar'
import { Vinyl } from './Vinyl'

export const AllVinyl = () => {
    const [allVinyl , setAllVinyl] = useState([])
    const [filteredVinyl, setFilteredVinyl] = useState([])


    useEffect(() => {
        getAllVinyl().then(vinylObjts => {
            setAllVinyl(vinylObjts)
        })
        
    }, [])
    useEffect(() => {
        setFilteredVinyl(allVinyl)
    },[allVinyl])


    return (
        <>
            <div className="header-container m-3">
                <header className="display-6 text-center">All Vinyl</header>
            </div>
            <FilterBar setFilteredVinyl={setFilteredVinyl} allVinyl={allVinyl}/>
            <div className="vinyls-container row border mx-2">
                {filteredVinyl?.reverse().map(vinyl => (
                    <Vinyl vinyl={vinyl} key={vinyl.id} generalView={true}/>    
                ))}

            </div>
        
        </>
    ) 
    
}