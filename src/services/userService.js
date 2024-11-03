export const getUserByEmail = (email) => {
  return fetch(`https://vinyl-miner-api.onrender.com/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  return fetch("https://vinyl-miner-api.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const getUserById = (userId) => {
  return fetch(`https://vinyl-miner-api.onrender.com/users?id=${userId}&_embed=vinyls`).then(res => res.json())
}

export const updateUser = (userobj) => {
  return fetch(`https://vinyl-miner-api.onrender.com/users/${userobj.id}`,{
    method: 'PUT',
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userobj)
  })
}

export const getALLUsers = () => {
  return fetch(`https://vinyl-miner-api.onrender.com/users`).then((res) =>
    res.json()
  )
}