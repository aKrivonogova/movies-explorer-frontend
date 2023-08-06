import './App.css';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import { useEffect, useState } from 'react';
import CurrentUserContext from '../Context/Context';
import * as MainApi from '../../utils/MainApi'
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoggedIn(true);
      MainApi.getContent(jwt)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    tokenCheck()
  }, []);


  const handleRegister = ({ name, password, email }) => {
    MainApi.register(name, password, email)
      .then((res) => {
        if (res.status !== 400) {
          handleLogin({ password, email });
          setErrorMessage(`Регистрация прошла успешно!`);
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          setErrorMessage('Введены неверные данные пользователя.');
        }
        if (error.status === 409) {
          setErrorMessage('Пользователь с таким email уже существует');
        }
        else {
          setErrorMessage('Что-то пошло не так...')
        }
      })
  }

  const handleLogin = ({ password, email }) => {
    MainApi.login(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          setErrorMessage('Введены неверные данные пользователя.');
        }
        if (error.status === 401) {
          setErrorMessage('Пользователь с таким email не существует');
        }
        else {
          setErrorMessage('Что-то пошло не так...')
        }
      })
  }

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
              element={SavedMovies}
              isLoggedIn={isLoggedIn}

            />} />
            <Route path='/profile' element={<ProtectedRouteElement
              element={Profile}
              isLoggedIn={isLoggedIn}
            />} />
            <Route path='/signin' element={<Login
              handleLogin={handleLogin}
              errorMessage={errorMessage} />} />
            <Route path='/signup' element={<Register
              handleRegister={handleRegister}
              errorMessage={errorMessage}
            />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      </div >
    </CurrentUserContext.Provider >
  );
}

export default App;
