class Api {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }

    get _headers() {
        return {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status)
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    setUserInfo(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({name, email})
        })
        .then(this._checkResponse)
    }
  
    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    createMovie(country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN})
        })
        .then(this._checkResponse)
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    
  }
  
const api = new Api({
    baseUrl: 'https://api.movies.vizetann.nomoredomains.sbs', 
});
  
export default api;