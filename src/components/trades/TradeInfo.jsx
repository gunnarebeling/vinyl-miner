import { Vinyl } from "../vinylViews/Vinyl"
import { VinylCard } from "../vinylViews/vinylcard"
import "./trades.css"

export const TradeInfo = ({tradeInitVinyl, tradeOfferVinyl} ) => {
    return (
        <div className="row trade-container">
            <div className="col d-flex justify-content-center">
                <div>
                    {(tradeOfferVinyl?.id) &&    
                        <VinylCard generalView={true} vinyl={tradeOfferVinyl}/>
                    }
                </div>
            </div>
        
            <div className="col d-flex justify-content-center align-items-center">
                <h1>for</h1>
            </div>
            
            <div className="col d-flex justify-content-center">
                <div>
                {(tradeInitVinyl?.id) &&
                            <VinylCard generalView={true} vinyl={tradeInitVinyl}/> 
                        }
                </div>
            </div>  
        </div>


    )
}