import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
import Preloader from "../Preloader/Preloader";
import { useState } from 'react';
import * as MoviesApi from '../../utils/MoviesApi';

function Movies({ isLoggedIn }) {
    const [moviesCollection, setMoviesCollection] = useState([]);

    const getMovies = async () => {
        return await MoviesApi.getMovies();
    }
    
    const filterMoviesByName = (movies, name) => {
        return movies.filter((movie) => movie.nameRU.includes(name) || movie.nameEN.includes(name));
    }
    
    const filterMoviesByDuration = (movies, duration = 40) => {
        return movies.filter((movie) => movie.duration <= duration);
    }
    
    const handleFilterMoviesCollection = async (searchData) => {
        console.log(searchData);//movieSearch, isShortMoviesOnly
        const movies = await getMovies();
        let filteredMovies = filterMoviesByName(movies, searchData.movieSearch);
        setMoviesCollection(searchData.isShortMoviesOnly ? filterMoviesByDuration(filteredMovies) : filteredMovies);
    }
    
    // const saveDataInLocalStorage = (dataTitle, storedValue) => {
    //   localStorage.setItem(`${dataTitle}`, JSON.stringify(storedValue))
    // }

    // const getDataFromLocalStorage = (dataTitle) => {
    //   return JSON.parse(localStorage.getItem(`${dataTitle}`));
    // }

    return (
        <>
            <Header isLoggedIn={isLoggedIn}></Header>
            <SearchForm handleFilterMovies={handleFilterMoviesCollection}></SearchForm>
            {/* {isLoading && (<Preloader />)} */}
            {false && (<Preloader />)}
            <MoviesList moviesCollection={moviesCollection}></MoviesList>
            <Footer></Footer>
        </>
    )
}

export default Movies;