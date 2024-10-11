export const getFollowersbyCurrentUser = (currentUser) => {
    return fetch(`http://localhost:8088/follows?followedUserId=${currentUser}`).then(res => res.json())
}

export const getFollowsbyCurrentUser = (currentUser) => {
    return fetch(`http://localhost:8088/follows?followingUserId=${currentUser}`).then(res => res.json())
}

export const postFollow = (data) => {
    return fetch(`http://localhost:8088/follows`, {
        method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:(JSON.stringify(data))
    })
}
export const deleteFollow = (followid) => {
 
    return fetch(`http://localhost:8088/follows/${followid}`,{
        method:'DELETE'
    })}