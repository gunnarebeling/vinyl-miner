export const postTrade = (tradeObj) => {
    return fetch(`https://vinyl-miner-api.onrender.com/trades`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tradeObj)
    })
}

export const getAllTrades = () => {
    return fetch(`https://vinyl-miner-api.onrender.com/trades?_embed=vinyl`).then(res => res.json())
}
export const deleteTrade = (id) => {
    return fetch(`https://vinyl-miner-api.onrender.com/trades/${id}`,{
        method: 'DELETE'
    })
}