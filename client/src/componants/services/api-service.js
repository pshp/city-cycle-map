const baseUrl = 'http://localhost:3001/tasks/';
const headers = { "Content-Type": "application/json"};

export const getPins = async () => {
  return fetch(baseUrl, {
    method:"GET",
    headers: headers,
  }).then(
    res => res.json()
  ).catch(
    (error) => console.log(error)
  );
}

// export const postTask = async (data) => {
//   return fetch(baseUrl, {
//     method:"POST",
//     headers: headers,
//     body: JSON.stringify(data)
//   }).then(
//     res => res.json()
//   ).catch(
//     (error) => console.log(error)
//   );
// }

// export const updateTitle = async (id, title) => {
//   return fetch(baseUrl+id+'/title/', {
//     method:"PATCH",
//     headers: headers,
//     body: JSON.stringify({title: title})
//   }).then(
//     res => res.json()
//   ).catch(
//     (error) => console.log(error)
//   );
// }

// export const updateStatus = async (id, status) => {
//   return fetch(baseUrl+id+'/status/', {
//     method:"PATCH",
//     headers: headers,
//     body: JSON.stringify({status: status})
//   }).then(
//     res => res.json()
//   ).catch(
//     (error) => console.log(error)
//   );
// }

// export const deleteTask = async (id) => {
//   return fetch(baseUrl + id, {
//     method:"DELETE",
//     headers: headers,
//   }).then(
//     res => res.json()
//   ).catch(
//     (error) => console.log(error)
//   );
// }