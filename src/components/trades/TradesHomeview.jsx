import { useContext, useEffect, useState } from "react"
import { deleteTrade, getAllTrades } from "../../services/tradeService"
import { UserContext } from "../../views/ApplicationViews"
import { getAllVinyl, updateVinyl } from "../../services/vinylServices"
import { TradeInfo } from "./TradeInfo"

export const TradesHomeView = () => {
    const [allTrades, setAllTrades] = useState([])
    const {currentUser} = useContext(UserContext)
    const [allVinyl, setAllVinyl] = useState([])
    const [acceptTriggered, setAcceptTriggered] = useState(false)
    const [tradePendingVinyl, setTradePendingVinyl] = useState([])
    const [tradeOfferVinyl, setTradeOfferVinyl] = useState([])
    const getAndSetTrades = () => {
        getAllTrades().then( res => {
            setAllTrades(res)
        })
    }
    useEffect(() => {
        getAndSetTrades()
        
    }, [acceptTriggered])
    useEffect(() => {
        getAllVinyl().then(res => {
            setAllVinyl(res)
        })
    }, [allTrades])
    useEffect(() => {
        setTradeOfferVinyl([])
        setTradePendingVinyl([])
         allTrades.forEach( (trade) => {
            
             allVinyl.forEach(vinyl => {
                if (vinyl.id === trade.tradeInitVinylId && vinyl.userId === currentUser){
                    const offerVinyl = allVinyl.find(vinyl => vinyl.id === trade.tradeOfferVinylId )
                    setTradeOfferVinyl( prevState =>[...prevState, {tradeInitVinyl: vinyl, tradeOfferVinyl: offerVinyl}])
                }else if(vinyl.id === trade.tradeOfferVinylId && vinyl.userId === currentUser){
                    const initVinyl = allVinyl.find(vinyl => vinyl.id === trade.tradeInitVinylId)
                    setTradePendingVinyl(prevState =>[...prevState, {tradeOfferVinyl: vinyl, tradeInitVinyl: initVinyl}])
                }
            })
            
            
        })
        

    }, [allVinyl, allTrades, currentUser])
    
    const tradeDelete = async (duplicateTrades) => {
        
        
        const deletePromises = duplicateTrades.map(trade => deleteTrade(trade?.id))

        await Promise.all(deletePromises)
    }

    const handleAcceptDelete = async (event) => {
        event.preventDefault()
        const findInitVinyl = allVinyl.find(vinyl => vinyl.id === parseInt(event.target.dataset.initid))
        const findOfferVinyl = allVinyl.find(vinyl => vinyl.id === parseInt(event.target.dataset.offerid))
        const tradeMatchForAccepted = allTrades.filter(trade => ((trade.tradeInitVinylId || trade.tradeOfferVinylId) === findInitVinyl.id) || ((trade.tradeOfferVinylId || trade.tradeInitVinylId )=== findOfferVinyl.id))
        const tradeMatchForDelete = allTrades.find(trade => (trade.tradeInitVinylId  === findInitVinyl.id) && (trade.tradeOfferVinylId === findOfferVinyl.id))
        const InitSwitch = {
            id: findInitVinyl.id,
            albumName: findInitVinyl.albumName,
            artist: findInitVinyl.artist,
            conditionId: findInitVinyl.conditionId,
            genreId: findInitVinyl.genreId,
            albumArt: findInitVinyl.albumArt,
            userId: findOfferVinyl.userId
        }
        const offerSwitch = {
            id: findOfferVinyl.id,
            albumName: findOfferVinyl.albumName,
            artist: findOfferVinyl.artist,
            conditionId: findOfferVinyl.conditionId,
            genreId: findOfferVinyl.genreId,
            albumArt: findOfferVinyl.albumArt,
            userId: findInitVinyl.userId
        }
      
        if(event.target.id === "accept"){
            await tradeDelete(tradeMatchForAccepted)
            await updateVinyl(InitSwitch)
            await updateVinyl(offerSwitch).then(() => {
                setAcceptTriggered(!acceptTriggered)
            })
            
        } else if(event.target.id === "decline"){
            await deleteTrade(tradeMatchForDelete.id).then(() => {
                setAcceptTriggered(!acceptTriggered)
            })
        }     
    }
    let pendingCount = 0
    let offerCount = 0
    return (
        <div id="trade-offers" className="trade-info-container">
           <div id="pending-offers-container" className="container ">
                <header className="h3 text-center m-3">Trade Offers</header>
                {tradeOfferVinyl.map(vinyls => {
                    offerCount ++
                    if (vinyls.tradeInitVinyl.userId === currentUser) {
                        return (
                            
                            <div key={offerCount} className="offer-trade-container border-2 m-2 px-3">
                                <TradeInfo  tradeInitVinyl={vinyls?.tradeInitVinyl} tradeOfferVinyl={vinyls?.tradeOfferVinyl}/>
                                <div className="text-center mb-3">
                                    <button id="accept" className="btn btn-primary m-3"  data-initid={vinyls.tradeInitVinyl.id} data-offerid={vinyls.tradeOfferVinyl.id} onClick={handleAcceptDelete}>Accept</button>
                                    <button id="decline" className="btn btn-warning " data-initid={vinyls.tradeInitVinyl.id} data-offerid={vinyls.tradeOfferVinyl.id} onClick={handleAcceptDelete}>Decline</button>
                                </div>
                        </div>
                            )
                        
                    }
                })}  
            </div>     

            
            <div id="pending-trades-container" className="container ">
                <header className="h3 text-center m-3">Trades Pending</header>
                {tradePendingVinyl.map(vinyls => {
                    pendingCount ++
                    if (vinyls.tradeOfferVinyl.userId === currentUser) {
                        return (
                            <div key={pendingCount} className="pending-trade-container  border-2 m-2 px-3">
                                <TradeInfo  tradeInitVinyl={vinyls?.tradeInitVinyl} tradeOfferVinyl={vinyls?.tradeOfferVinyl}/>
                                <div className="text-center mb-3">
                                    <button id="decline" className="btn btn-warning  " data-initid={vinyls.tradeInitVinyl.id} data-offerid={vinyls.tradeOfferVinyl.id} onClick={handleAcceptDelete}>Delete</button>
                                </div>
                        </div>
                            )
                        
                    }
                })}  
            </div>
        </div>
    )
}