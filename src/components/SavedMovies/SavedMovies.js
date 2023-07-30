import React from "react";
import Movies from "../Movies/Movies";

function SavedMovies({ savedMovies }) {
  return <Movies movies={savedMovies} />;
}

export default SavedMovies;
