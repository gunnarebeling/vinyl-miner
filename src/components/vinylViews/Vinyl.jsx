export const Vinyl = ({vinyl}) => {
    return (
                       
        <div className='col-12 col-md-6 mb-3' key={vinyl?.id}>
            <div className='vinyl-container card m-1 d-flex flex-column'>
                <div className=' row info '>
                    <div className=' col info flex-grow-1'>
                        <section className='title m-2'>Title: {vinyl.albumName}</section>
                        <section className='artist m-2'>Artist : {vinyl.artist}</section>
                        <section className='genre m-2'>genre: {vinyl.genre.name}</section>
                        <section className='condition m-2'>condition: {vinyl.condition.name}</section>
                        <section className='user m-2'>user: {vinyl.user.fullName}</section>
                    </div>
                    <div className='image col m-2'>
                        <img src={`${vinyl.albumArt}`} alt={`${vinyl.albumName}`} className='img-fluid'/>
                    </div>
                </div>
                    <div className='btn-container text-center mt-auto' >
                        <button className='m-2'>button</button>
                        <button>button</button>
                    </div>
            </div>
        </div>
        
    
    )
}