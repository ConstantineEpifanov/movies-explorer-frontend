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
import { getUserInfo, getSavedMovies } from "../../utils/MainApi";
import { getMoviesList } from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenChecked, setTokenChecked] = useState(false);
  const [isPreloader, setPreloader] = useState(false);
  const [isErrorSearchMessage, setErrorSearchMessage] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Вход авторизованного
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setPreloader(true);
      getUserInfo(token)
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
          navigate(location.pathname, { replace: true });
          setTokenChecked(true);
        })
        .catch((err) => console.log(err));
    } else {
    }
    setTokenChecked(true);
  }, []);

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
          setErrorSearchMessage(true);
        });
    }
  }, [loggedIn]);

  // Запрос на свое АПИ за сохраненными пользователем фильмами
  useEffect(() => {
    if (loggedIn) {
      getSavedMovies()
        .then((res) => {
          setSavedMovies(
            res.filter((movie) => movie.owner === currentUser.ownerId)
          );
        })
        .catch((err) => {
          console.log(err);
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

  return (
    <div className="app">
      {!isTokenChecked ? (
        <Preloader isPreloader={isPreloader} />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          {location.pathname !== "/signin" &&
            location.pathname !== "/signup" &&
            location.pathname !== "/404" && <Header location={location} />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  movies={movies}
                  isErrorSearchMessage={isErrorSearchMessage}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} savedMovies={savedMovies}/>
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
            <Route path="*" element={<Navigate to="/404" />} />
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
