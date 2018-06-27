const api = "http://localhost:8000/api"

const headers = {
  'content-type': 'application/json'
}


// User
export const registerUser = (data) =>
  fetch(`${api}/user/register`, { method: 'POST', headers, body: JSON.stringify(data) })

export const loginUser = (data) =>
  fetch(`${api}/user/login`, { method: 'POST', headers, body: JSON.stringify(data) })


// Languages
export const getLanguages = (id, token) =>
  fetch(`${api}/language/${id}`, { method: 'GET', headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': token }})

export const addLanguage = (data, token) =>
  fetch(`${api}/language/add`, { method: 'POST', headers: { ...headers, 'Authorization': token}, body: JSON.stringify(data) })

export const updateLanguage = (data, token) =>
  fetch(`${api}/language/update`, { method: 'PATCH', headers: { ...headers, 'Authorization': token}, body: JSON.stringify({language_id: data.id, update: data.update})})

export const deleteLanguage = (id, token) =>
  fetch(`${api}/language/delete/${id}`, { method: 'DELETE', headers: { ...headers, 'Authorization': token}})


// Projects
export const getProjects = (id, token) =>
  fetch(`${api}/project/${id}`, { method: 'GET', headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': token }})

export const addProject = (data, token) =>
  fetch(`${api}/project/add`, { method: 'POST', headers: { ...headers, 'Authorization': token}, body: JSON.stringify(data) })

export const deleteProject = (id, token) =>
  fetch(`${api}/project/delete/${id}`, { method: 'DELETE', headers: { ...headers, 'Authorization': token }})

export const addLanguageToProject = (data, token) =>
  fetch(`${api}/project/language/add`, { method: 'POST', headers: { ...headers, 'Authorization': token }, body: JSON.stringify(data) })


// Notes
export const addNote = (data, token) =>
  fetch(`${api}/note/add`, { method: 'POST', headers: { ...headers, 'Authorization': token}, body: JSON.stringify(data) })

export const deleteNote = (id, token) =>
  fetch(`${api}/note/delete/${id}`, { method: 'DELETE', headers: { ...headers, 'Authorization': token }})
