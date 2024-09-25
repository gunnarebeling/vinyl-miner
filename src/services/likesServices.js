export const getLikesByVinylId = (id) => {
    return fetch(`http://localhost:8088/likes?vinylId=${id}`).then(res => res.json())
}

export const UpdateLike = (likeObj) => {
 
        likeObj.liked = !likeObj.liked
        return fetch(`http://localhost:8088/likes/${likeObj.id}`,{
            method:'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: (JSON.stringify(likeObj))

        })
}
export const postLike = (likeObj) =>{
        return fetch(`http://localhost:8088/likes`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:(JSON.stringify(likeObj))
        })

    
}