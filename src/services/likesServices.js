export const getLikesByVinylId = (id) => {
    return fetch(`https://vinyl-miner-api.onrender.com/likes?vinylId=${id}`).then(res => res.json())
}

export const UpdateLike = (likeObj) => {
 
        likeObj.liked = !likeObj.liked
        return fetch(`https://vinyl-miner-api.onrender.com/likes/${likeObj.id}`,{
            method:'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: (JSON.stringify(likeObj))

        })
}
export const postLike = (likeObj) =>{
        return fetch(`https://vinyl-miner-api.onrender.com/likes`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:(JSON.stringify(likeObj))
        })

    
}
export const deleteLike = (likeObj) => {
    return fetch(`https://vinyl-miner-api.onrender.com/likes/${likeObj.id}`,{
        method: 'DELETE',})
}