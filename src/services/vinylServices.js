export const getAllVinyl = () => {
    return fetch('http://localhost:8088/vinyls?_expand=user&_expand=genre&_expand=condition').then(res => res.json())
}

export const getVinylByUser = (user) => {
    return fetch(`http://localhost:8088/vinyls?userId=${user}&_expand=user&_expand=genre&_expand=condition`).then(res => res.json())
}