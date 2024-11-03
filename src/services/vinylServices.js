export const getAllVinyl = () => {
    return fetch('https://vinyl-miner-api.onrender.com/vinyls?_expand=user&_expand=genre&_expand=condition').then(res => res.json())
}

export const getVinylByUser = (user) => {
    return fetch(`https://vinyl-miner-api.onrender.com/vinyls?userId=${user}&_expand=user&_expand=genre&_expand=condition`).then(res => res.json())
}

export const postVinyl = (vinyl) => {
    return fetch('https://vinyl-miner-api.onrender.com/vinyls',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vinyl)
    })
}

export const getVinylById = (id) => {
    return fetch(`https://vinyl-miner-api.onrender.com/vinyls/${id}?_expand=user&_expand=genre&_expand=condition`).then(res => res.json())
} 
export const updateVinyl = (vinyl) => {
    return fetch(`https://vinyl-miner-api.onrender.com/vinyls/${vinyl.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vinyl)
    })
}
export const deleteVinyl = (vinylId) => {
    return fetch(`https://vinyl-miner-api.onrender.com/vinyls/${vinylId}`, {
        method: "DELETE"
    })
}