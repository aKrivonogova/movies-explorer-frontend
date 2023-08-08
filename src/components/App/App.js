import './App.css';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import CurrentUserContext from '../Context/Context';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import * as MainApi from '../../utils/api/MainApi';

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.getContent(jwt)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(true);
    if(location.pathname === '/signin') {
      navigate('/movies', { replace: true });
    }
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              element={Movies}
              isLoggedIn={isLoggedIn}
            />} />
            <Route path='/profile' element={<ProtectedRouteElement
              element={Profile}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
            />} />
            <Route path='/signin' element={<Login
              setIsLoggedIn={setIsLoggedIn} 
              />} />
            <Route path='/signup' element={<Register
              setIsLoggedIn={setIsLoggedIn}
            />} />
            <Route path='*' element={<NotFound/>} />
          </Routes>
        </main>
      </div >
    </CurrentUserContext.Provider >
  );
}

export default App;
