import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import CurrentUserContext from '../Context/Context';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import * as MainApi from '../../utils/api/MainApi';
function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  const getUser = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsLoggedIn(false);
      return;
    }
    MainApi.getContent(jwt)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          console.log(error);
        })
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if(isLoggedIn){
      getUser();
    }
  }, [isLoggedIn]);

  console.log('isLoggedIn', isLoggedIn);

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      <div className="App">
        <main className='main'>
          <Routes>
            <Route path='/' element={<Main
              isLoggedIn={isLoggedIn}
            />} />
            <Route path='/movies' element={<ProtectedRouteElement
              element={Movies}
              isLoggedIn={isLoggedIn}
            />} />
            <Route path='/saved-movies' element={<ProtectedRouteElement
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
            />} />
            <Route path='/profile' element={<ProtectedRouteElement
              element={Profile}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />} />
            <Route path='/signin' element={
              isLoggedIn ? <Navigate to="/movies" replace /> : <Login
                setIsLoggedIn={setIsLoggedIn} 
              />} 
            />
            <Route path='/signup' element={
              isLoggedIn ? <Navigate to="/movies" replace /> : <Register
                setIsLoggedIn={setIsLoggedIn}
              />}
            />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </main>
      </div >
    </CurrentUserContext.Provider >
  );
}

export default App;
