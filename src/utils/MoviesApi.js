const API_ROOT = "https://api.nomoreparties.co/beatfilm-movies";
const FILE_ROOT = 'https://api.nomoreparties.co';

class MoviesApi {
    constructor(url) {
      this._url = url;
      this._headers = {
        "Content-type": "application/json",
      };
    }
  
    async _checkResult(response) {
      if (response.ok) {
        const resData = await response.json();
        return resData;
      }
      console.log('error here')
      return Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );
    }

    getMovies() {
        return fetch(`${this._url}`, {
          method: "GET",
          headers: this._headers,
          
        }).then(this._checkResult);
      }
    }

const moviesApi = new MoviesApi(API_ROOT);
export {API_ROOT, FILE_ROOT,  moviesApi};
