import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main loggedIn={false} />} />
        <Route path="/movies" element={<Movies loggedIn={true} locationPath={location.pathname} />} />
        <Route path="/saved-movies" element={<SavedMovies loggedIn={true} locationPath={location.pathname} />} />
        <Route path="/profile" element={<Profile loggedIn={true} />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div >
  );
}

export default App;
