import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

import Login from "../Login/Login";
import Register from "../Register/Register";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  getUserInfo,
  getSavedMovies,
  addFavorite,
  deleteFavorite,
} from "../../utils/MainApi";
import { getMoviesList } from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";
import handleError from "../../utils/handleError";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloader, setPreloader] = useState(true);
  const [isErrorSearchMessage, setErrorSearchMessage] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Вход авторизованного
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
          navigate(location.pathname, { replace: true });
        })
        .catch((err) => {
          console.log(err);
          handleError(err);
        });
    } else {
    }
    setTimeout(() => {
      setPreloader(false);
    }, 700);
  }, [loggedIn]);

  // Переадресация авторизованного
  useEffect(() => {
    if (
      loggedIn &
      (location.pathname === "/signup" || location.pathname === "/signin")
    ) {
      navigate("/movies", { replace: false });
    }
  }, [loggedIn, navigate, location]);

  // Запрос за первоначальными фильмами
  useEffect(() => {
    if (loggedIn) {
      getMoviesList()
        .then((res) => {
          localStorage.setItem("movies", JSON.stringify(res));
          setMovies(res);
        })
        .catch((err) => {
          console.log(err);
          handleError(err);
          setErrorSearchMessage(true);
        });
    }
  }, [loggedIn]);

  // Запрос на свое АПИ за сохраненными пользователем фильмами
  useEffect(() => {
    if (loggedIn) {
      getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.log(err);
          handleError(err);
        });
    }
  }, [loggedIn]);

  // Выход из приложения
  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    setSavedMovies([]);
    navigate("/", { replace: true });
  }

  // Удаление фильма из сохраненных
  function handleMovieDelete(movie) {
    deleteFavorite(movie)
      .then(() => {
        setSavedMovies((movies) => movies.filter((m) => m._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
        handleError(err);
      });
  }

  // Добавить фильм в сохраненные
  function handleMovieFavorite(movie) {
    movie.owner = currentUser._id;
    addFavorite(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        handleError(err);
      });
  }

  return (
    <div className="app">
      {isPreloader ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          {location.pathname !== "/signin" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/404" && (
              <Header location={location} loggedIn={loggedIn} />
            )}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  movies={movies}
                  savedMovies={savedMovies}
                  isErrorSearchMessage={isErrorSearchMessage}
                  handleMovieDelete={handleMovieDelete}
                  handleMovieFavorite={handleMovieFavorite}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  handleMovieDelete={handleMovieDelete}
                  handleMovieFavorite={handleMovieFavorite}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  handleLogout={handleLogout}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  setLoggedIn={setLoggedIn}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace={true} />} />
          </Routes>
          {location.pathname !== "/signin" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/404" &&
            location.pathname !== "/profile" && <Footer />}
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
