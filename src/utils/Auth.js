import {BACKEND_API_ROOT} from "../utils/constants";

const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(
        new Error(`Ошибка ${res.status}: ${res.statusText}`)
      );
};

export const register = ({ name, email, password }) => {
  return fetch(`${BACKEND_API_ROOT}/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json",
    "Access-Control-Allow-Origin": "https://movie-explorer.nomoredomains.icu",
   },
    credentials: 'include',
    body: JSON.stringify({
      name: name,
      password: password,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BACKEND_API_ROOT}/signin`, {
    method: "POST",
    headers: { "Content-type": "application/json",
    "Access-Control-Allow-Origin": "https://movie-explorer.nomoredomains.icu",
  },
    credentials: 'include',
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

export const logout = () => {
  return fetch(`${BACKEND_API_ROOT}/signout`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: 'include',
  }).then((res) => {
      if (res.ok && res.status === 200) {
        return true;
      }  else {
        throw new Error("Произошла какая-то ошибка");
      }
  })
};
