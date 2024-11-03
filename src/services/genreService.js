export const getGenres = () => {
    return fetch('https://vinyl-miner-api.onrender.com/genres').then(res => res.json())
}