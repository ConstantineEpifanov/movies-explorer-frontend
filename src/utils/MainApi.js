export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
  return fetch(`http://localhost:3001${url}`, options).then(checkResponse);
}
// https://api.movies.constantine.nomoredomains.rocks

function setHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

// Авторизация

export function register({ name, email, password }) {
  return request("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export function login({ email, password }) {
  return request("/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function updateUserInfo({ name, email }) {
  return request("/users/me", {
    method: "PATCH",
    headers: setHeaders(),
    body: JSON.stringify({ name, email }),
  });
}

export function getUserInfo() {
  return request("/users/me", {
    method: "GET",
    headers: setHeaders(),
  });
}

// Фильмы

export function addFavorite(movie) {
  return request("/movies", {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      owner: movie.owner,
    }),
  });
}

export function deleteFavorite(movie) {
  return request(`/movies/${movie._id}`, {
    method: "DELETE",
    headers: setHeaders(),
  });
}

export function getSavedMovies() {
  return request("/movies", {
    method: "GET",
    headers: setHeaders(),
  });
}
