import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import CurrentUserContext from '../Context/Context';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <main className='main'>
          <Header isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path='/' element={<Main
              isLoggedIn={isLoggedIn}
            />} />
            <Route path='/movies' element={<ProtectedRouteElement
              element={Movies}
            />} />
            <Route path='/saved-movies' element={<ProtectedRouteElement
              element={SavedMovies}
            />} />
            <Route path='/profile' element={<ProtectedRouteElement
              element={Profile}
            />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div >
    </CurrentUserContext.Provider >
  );
}

export default App;
