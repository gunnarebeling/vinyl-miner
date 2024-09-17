import { useEffect, useState } from 'react'
import './Vinyl.css'
import { getAllVinyl } from '../../services/vinylServices'
export const AllVinyl = () => {
    const [allVinyl , setAllVinyl] = useState([])

    useEffect(() => {
        getAllVinyl().then(vinylObjts => {
            setAllVinyl(vinylObjts)
        })
    }, [])

    return (
        <>
            <div className="header-container m-3">
                <header className="display-6 text-center">New Vinyl</header>
            </div>
            <div className="vinyls-container border mx-2">
                {allVinyl?.map(vinyl => {
                    return (
                    
                        <div className='vynl container card m-1' key={vinyl?.id}>
                            <div className='info-art '>
                                <section className='vinyl name'>Title: {vinyl.albumName}</section>
                                <section className='vinyl name'>Artist : {vinyl.artist}</section>
                                <section className='vinyl name'>genre: {vinyl.genre.name}</section>
                                <section className='vinyl name'>condition: {vinyl.condition.name}</section>
                                <section className='vinyl name'>user: {vinyl.user.fullName}</section>
                            </div>


                        </div>
                    
                    )
                })}

            </div>
        
        </>
    ) 
    
}