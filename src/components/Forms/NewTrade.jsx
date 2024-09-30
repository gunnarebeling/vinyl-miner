import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../views/ApplicationViews"
import { useNavigate, useParams } from "react-router-dom"
import { getAllVinyl } from "../../services/vinylServices"
import './forms.css'
import { postTrade } from "../../services/tradeService"
import { TradeInfo } from "../trades/TradeInfo"

export const NewTrade = () => {
    const [allVinyl, setAllVinyl] = useState([])
    const [tradeOfferVinyl, setTradeOfferVinyl] = useState({})
    const [tradeInitVinyl, setTradeInitVinyl] = useState({})
    const [usersVinyl, setUsersVinyl] = useState([])
    const {tradeInitVinylId} = useParams()
    const {currentUser} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        getAllVinyl().then(res => {
            setAllVinyl(res)
        })
    }, [])
    useEffect(() => {
        const filteredVinyl = allVinyl?.filter(vinyl => vinyl.userId === currentUser)
        setUsersVinyl(filteredVinyl)
        const filteredInitVinyl = allVinyl.find(vinyl => vinyl.id === parseInt(tradeInitVinylId))
        setTradeInitVinyl(filteredInitVinyl)
    }, [allVinyl, currentUser, tradeInitVinylId] )
    const handleSubmitTrade=() => {
        if (tradeOfferVinyl.id) {
            const tradeObj = {
                tradeInitVinylId: parseInt(tradeInitVinylId),
                tradeOfferVinylId: tradeOfferVinyl.id
            }
            postTrade(tradeObj).then(
                navigate(`/trades`)
            )
            
        }else{
            window.alert("please choose a trade offer")
        }
        
    }
    return (
        <div className=" pb-3">
            <div className="header-container m-3">
                <header className="display-6 text-center bodoni-moda-sc-title">Create Trade</header>
            </div>
            <div id="trade-offer-vinyl" className="text-center ">
                <div>
                    <label >select vinyl to trade</label>
                </div>
                <select 
                
                name="tradeOfferVinyl" 
                id="tradeOfferVinyl"
                value={tradeOfferVinyl.id}
                onChange={(event) =>{
                    event.preventDefault()
                    const selectedVinyl = usersVinyl.find(vinyl => vinyl.id === parseInt(event.target.value))
                    setTradeOfferVinyl(selectedVinyl)
                }}>
                    <option value="0">select vinyl</option>
                    {usersVinyl.map(vinyl => {
                        return (
                            
                            <option key={vinyl?.id } value={vinyl?.id}>{vinyl?.albumName}</option>
                            
                        )
                    })}
                </select>
            </div>
            
                <div className="container border  mt-5">
                <TradeInfo tradeInitVinyl={tradeInitVinyl} tradeOfferVinyl={tradeOfferVinyl}/>
            
                <div className="text-center m-3">
                    <button className="btn btn-primary" onClick={handleSubmitTrade}>submit</button>
                </div>

                </div>
        </div>
    )
}