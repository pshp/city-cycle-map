const baseUrl = "http://localhost:3001/";
const headers = { "Content-Type": "application/json" };

export const getPins = async () => {
  return fetch(baseUrl + "pins", {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const postPin = async (data) => {
  return fetch(baseUrl + "pins", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const deletePin = async (id) => {
  return fetch(baseUrl + "pins/" + id, {
    method:"DELETE",
    headers: headers,
  }).then(
    res => res.json()
  ).catch(
    (error) => console.log(error)
  );
}

export const editPin = async (id, data) => {
  return fetch(baseUrl + "pins/" + id, {
    method:"PATCH",
    headers: headers,
    body: JSON.stringify(data)
  }).then(
    res => res.json()
  ).catch(
    (error) => console.log(error)
  );
}

export const newUser = async (data) => {
  return fetch(baseUrl + "users", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
};


