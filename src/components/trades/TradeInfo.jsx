import { Vinyl } from "../vinylViews/Vinyl"
import { VinylCard } from "../vinylViews/vinylcard"
import "./trades.css"

export const TradeInfo = ({tradeInitVinyl, tradeOfferVinyl} ) => {
    return (
        <div className="row trade-container d-flex align-items-stretch">
            <div className="col d-flex justify-content-center">
                <div>
                    {(tradeOfferVinyl?.id) &&    
                        <VinylCard generalView={true} vinyl={tradeOfferVinyl}/>
                    }
                </div>
            </div>
        
            <div className=" trade-for col d-flex justify-content-center align-items-center">
                <h1><i className="fa-solid fa-arrow-right-arrow-left fa-lg"></i></h1>
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