export const getFollowersbyCurrentUser = (currentUser) => {
    return fetch(`https://vinyl-miner-api.onrender.com/follows?followedUserId=${currentUser}`).then(res => res.json())
}

export const getFollowsbyCurrentUser = (currentUser) => {
    return fetch(`https://vinyl-miner-api.onrender.com/follows?followingUserId=${currentUser}`).then(res => res.json())
}

export const postFollow = (data) => {
    return fetch(`https://vinyl-miner-api.onrender.com/follows`, {
        method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:(JSON.stringify(data))
    })
}
export const deleteFollow = (followid) => {
 
    return fetch(`https://vinyl-miner-api.onrender.com/follows/${followid}`,{
        method:'DELETE'
    })}