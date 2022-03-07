const baseUrl = 'http://localhost:3001/';
const headers = { 'Content-Type': 'application/json' };

export const getPins = async () => fetch(`${baseUrl}pins`, {
  method: 'GET',
  headers,
})
  .then((res) => res.json())
  .catch((error) => console.log(error));

export const postPin = async (data) => fetch(`${baseUrl}pins`, {
  method: 'POST',
  headers,
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .catch((error) => console.log(error));

export const deletePin = async (id) => fetch(`${baseUrl}pins/${id}`, {
  method: 'DELETE',
  headers,
})
  .then((res) => res.json())
  .catch((error) => console.log(error));

export const editPin = async (id, data) => fetch(`${baseUrl}pins/${id}`, {
  method: 'PATCH',
  headers,
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .catch((error) => console.log(error));

export const newUser = async (data) => fetch(`${baseUrl}users/signup`, {
  method: 'POST',
  headers,
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .catch((error) => console.log(error));

export const loginUser = async (data) => fetch(`${baseUrl}users/login`, {
  method: 'POST',
  headers,
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .catch((error) => console.log(error));
