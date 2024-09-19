export const getConditions = () => {
    return fetch('http://localhost:8088/conditions').then(res => res.json())
}