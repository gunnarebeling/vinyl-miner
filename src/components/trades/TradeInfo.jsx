import { Vinyl } from "../vinylViews/Vinyl"
import { VinylCard } from "../vinylViews/vinylcard"

export const TradeInfo = ({tradeInitVinyl, tradeOfferVinyl} ) => {
    return (
        <div className="d-inline-block d-md-flex justify-content-md-center text-center align-items-center">
            <div className="p-2 trade-card d-flex justify-content-end my-5 col-3 mx-auto w-100 h-auto">
                    {(tradeOfferVinyl?.id) &&    
                        <VinylCard generalView={true} vinyl={tradeOfferVinyl}/>
                    }
            </div>
        
            <div className="p-2 arrows mx-auto">
                <h1>for</h1>
            </div>
            
            <div className="p-2 trade-card my-5  col-3 mx-auto w-100 h-auto">
                <div>
                {(tradeInitVinyl?.id) &&
                            <VinylCard generalView={true} vinyl={tradeInitVinyl}/> 
                        }
                </div>
            </div>  
        </div>


    )
}