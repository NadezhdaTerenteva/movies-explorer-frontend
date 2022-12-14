import { BACKEND_API_ROOT } from '../utils/constants';
import AuthError from './errors/AuthError';
import ConflictError from './errors/ConflictError';

class MainApi {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      "Content-type": "application/json",
    };
  }

  async _checkResult(response) {
    if (response.ok) {
      const resData = await response.json();
      return resData.data;
    }
    if (response.status === 401) {
      return Promise.reject(new AuthError('Ошибка авторизации'))
    }
    if (response.status === 409) {
      return Promise.reject(new ConflictError('Пользователь с таким email уже зарегистрирован'))
    }

    return Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`)
    );
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResult);
  }

  updateUser(userData) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
      }),
    }).then(this._checkResult);
  }

  //сохраненные фильмы 
  getFavoriteMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResult);
  }

  addMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        id: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    }).then(this._checkResult);
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResult);
  }
}

export const mainApi = new MainApi(BACKEND_API_ROOT);
