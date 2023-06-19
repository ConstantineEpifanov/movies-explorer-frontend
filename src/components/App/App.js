import React from "react";
import {Routes, Route, useLocation, Navigate} from "react-router-dom"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";

import Login from '../Login/Login'
import Register from '../Register/Register'

function App() {

  const location = useLocation()

  return (
    <div className='app'>
      {location.pathname !== '/sign-in' &&  location.pathname !== '/sign-up' && location.pathname !== '/404' && <Header location={location}/>}
      <Routes>
        <Route path='/' element={ <Main /> }  />
        {/* <Route path='/movies' element={ <Movies width={width} cards={cards} isMoreBtnDisplayed={isMoreBtnDisplayed} onDisplayMoreCards={handleDisplayMoreCardsClick} isLoading={isLoading}/> }  />
        <Route path='/saved-movies' element={ <SavedMovies width={width} savedMovie={savedMovie} cards={savedCards} isMoreBtnDisplayed={isMoreSavedBtnDisplayed} onDisplayMoreCards={handleDisplayMoreSavedCardsClick} isLoading={isLoading}/> }  />
        <Route path='/profile' element={ <Profile userInfo={userInfo} setUserInfo={setUserInfo}/> } /> */}
        <Route path='/sign-in' element={ <Login/> } />
        <Route path='/sign-up' element={ <Register/> } />
        <Route path='/404' element={ <NotFound/> } />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
      {location.pathname !== '/sign-in' &&  location.pathname !== '/sign-up' && location.pathname !== '/404' && location.pathname !== '/profile' && <Footer/>}
    </div>
  );
}

export default App;
