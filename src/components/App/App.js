import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import Footer from '../Footer/Footer';
function App() {

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const showHeaderElement = ['/movies', '/saved-movies', '/', '/profile', ''].includes(
    location.pathname
  );
  const showFooterElement = ['/movies', '/saved-movies', '/'].includes(
    location.pathname
  );

  const protectedRoutes = ['/movies', '/saved-movies', '/profile', ''];

  useEffect(() => {
    protectedRoutes.includes(location.pathname) ? setLoggedIn(true) : setLoggedIn(false);
  })


  function handleOpenMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function handleCloseMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }


  return (
    <div className="App">
      {showHeaderElement && <Header loggedIn={loggedIn} handleOpenMenu={handleOpenMenu} />}
      <main className='main'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies locationPath={location.pathname} isLoading={isLoading} />} />
          <Route path="/saved-movies" element={<SavedMovies locationPath={location.pathname} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        {loggedIn ? <MobileMenu isMobileMenuOpen={isMobileMenuOpen} handleCloseMobileMenu={handleCloseMobileMenu} /> : null}
      </main>
      {showFooterElement && <Footer />}
    </div >
  );
}

export default App;
