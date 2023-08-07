import './App.css';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import * as MoviesApi from '../../utils/MoviesApi'
import { useEffect, useState } from 'react';
import CurrentUserContext from '../Context/Context';
import * as MainApi from '../../utils/MainApi'
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

function App() {

  const navigate = useNavigate();
  const location = useLocation();
  // для проверки на авторизацию 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // глобальное значение 
  const [currentUser, setCurrentUser] = useState([]);
  // переменная для ошибок в результате запросов к серверу
  const [errorMessage, setErrorMessage] = useState('');
  // все фильмы с сервера
  const [moviesCollection, setMoviesCollection] = useState([]);
  // сохраненные фильмы
  const [savedMoviesCollection, setSavedMoviesCollection] = useState([]);
  // найденные по параметрам фильмы 
  const [filteredMoviesCollection, setFilteredMoviesCollection] = useState([]);
  // переменная для состояния чекбокса короткометражки 
  const [isShortsMovies, setIsShorts] = useState(false);


  // Проверка токена пользователя 
  // Подгружаем контенкт, если токен есть 
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

  // Регистрация пользователя
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

  // Авторизация пользователя 
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

  // Выход из приложения 
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  }


  const handleFilterMoviesCollection = (dataKeyword) => {
    if (!localStorage.moviesCollection) {
      MoviesApi.getMovies()
        .then((moviesDataFromServer) => {
          setMoviesCollection(moviesDataFromServer);
          saveDataInLocalStorage('moviesCollection', moviesDataFromServer);
          setFilteredMoviesCollection(filterMoviesCollection(moviesCollection, dataKeyword))
          // saveDataInLocalStorage('moviesFoundCollection', filteredMoviesCollection);
          saveDataInLocalStorage('filteredMoviesCollection', filteredMoviesCollection);
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      // setFilteredMoviesCollection(filterMoviesCollection(getDataFromLocalStorage('moviesCollection'), dataKeyword));
      // console.log('данные фильмов из хранилища - ', getDataFromLocalStorage('moviesCollection'));
      // saveDataInLocalStorage('filteredMoviesCollection', filteredMoviesCollection);
      // const result = getDataFromLocalStorage('filteredMoviesCollection');
      // console.log(result);
      // localStorage.setItem('filteredMoviesCollection', JSON.stringify(filteredMoviesCollection));

      // setFilteredMoviesCollection(filterMoviesCollectionDuration());
      setFilteredMoviesCollection(filterMoviesCollection(getDataFromLocalStorage('moviesCollection'), dataKeyword));
      console.log(filteredMoviesCollection);


    }
  }
  // функция для сохранения в локальное хранилище 
  const saveDataInLocalStorage = (dataTitle, storedValue) => {
    localStorage.setItem(`${dataTitle}`, JSON.stringify(storedValue))
  }

  const getDataFromLocalStorage = (dataTitle) => {
    return JSON.parse(localStorage.getItem(`${dataTitle}`));
  }

  // функция для фильтрации по ключевому слову
  function filterMoviesCollection(moviesCollection, dataKeyword) {
    const resultFilterMoviesCollection = moviesCollection.filter((movieItem) => {
      return movieItem.nameRU.toLowerCase().includes(dataKeyword.toLowerCase());
    })
    return resultFilterMoviesCollection;
  }


  // функция фильтрации по длительности 

  const filterMoviesCollectionDuration = () => {
    const filteredMovies = filteredMoviesCollection.filter((movieItem) => movieItem.duration <= 40);
    return filteredMovies;
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
              handleLogOut={handleLogOut}
              handleFilterMovies={handleFilterMoviesCollection}
              foundedMovies={filteredMoviesCollection}
              locationPath={location.pathname}
            />} />
            <Route path='/saved-movies' element={<ProtectedRouteElement
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
              handleLogOut={handleLogOut}

            />} />
            <Route path='/profile' element={<ProtectedRouteElement
              element={Profile}
              isLoggedIn={isLoggedIn}
              handleLogOut={handleLogOut}
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
