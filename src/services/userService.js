export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const getUserById = (userId) => {
  return fetch(`http://localhost:8088/users?id=${userId}&_embed=vinyls`).then(res => res.json())
}

export const updateUser = (userobj) => {
  return fetch(`http://localhost:8088/users/${userobj.id}`,{
    method: 'PUT',
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userobj)
  })
}

export const getALLUsers = () => {
  return fetch(`http://localhost:8088/users`).then((res) =>
    res.json()
  )
}