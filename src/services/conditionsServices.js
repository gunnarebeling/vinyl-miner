
export const getConditions = () => {
    return fetch('https://vinyl-miner-api.onrender.com/conditions').then(res => res.json())
}