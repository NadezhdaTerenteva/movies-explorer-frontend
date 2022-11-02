//export const BASE_URL = "https://back.movie-explorer.nomoredomains.icu";
export const BASE_URL = "http://localhost:4000";
const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(
        new Error(`Ошибка ${res.status}: ${res.statusText}`)
      );
};

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({
      name: name,
      password: password,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
    credentials: 'include',
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: 'include',
  }).then((res) => checkResponse(res));
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    credentials: 'include',
  }).then((res) => checkResponse(res));
};
