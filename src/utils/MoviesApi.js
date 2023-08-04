import { checkResponse } from "./MainApi";

function request(option) {
  return fetch(`https://api.nomoreparties.co/beatfilm-movies`, option).then(
    checkResponse
  );
}

export function getMoviesList() {
  return request({
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
}
