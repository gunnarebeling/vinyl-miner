export const postTrade = (tradeObj) => {
    return fetch(`http://localhost:8088/trades`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tradeObj)
    })
}

export const getAllTrades = () => {
    return fetch(`http://localhost:8088/trades?_embed=vinyl`).then(res => res.json())
}
export const deleteTrade = (id) => {
    return fetch(`http://localhost:8088/trades/${id}`,{
        method: 'DELETE'
    })
}