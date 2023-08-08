import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
import Preloader from "../Preloader/Preloader";
import { useLocation } from 'react-router-dom';
import { useMoviesFiltration } from "../../hooks/useMoviesFiltration"
import { useEffect, useState } from 'react';
import { getSavedMovies } from '../../utils/api/MainApi';
import * as MoviesApi from '../../utils/api/MoviesApi';

function Movies({ isLoggedIn }) {
    const [isLoading, setIsLoading] = useState(false);
    const [initialSearch, setInitialSearch] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const [isDurationFilterActive, setIsDurationFilterActive] = useState(false);
    const { findMoviesByName, filterMoviesByDuration } = useMoviesFiltration();

    const saveDataToLocalStorage = (dataTitle, storedValue) => {
        localStorage.setItem(`${dataTitle}`, JSON.stringify(storedValue))
    }

    const getDataFromLocalStorage = (dataTitle) => {
        return JSON.parse(localStorage.getItem(`${dataTitle}`));
    }

    const loadSavedMovies = async () => {
        return await getSavedMovies();
    }

    const getMovies = async () => {
        return await MoviesApi.getMovies();
    }

    const loadCollection = async () => {
        const movies = await getMovies();
        saveDataToLocalStorage('collection', movies);
        return movies;
    }

    const onSearch = async ({movieSearch}) => {
        setIsLoading(true);

        let movies;
        if(!localStorage.collection) {
            movies = await loadCollection();
        } else {
            movies = getDataFromLocalStorage('collection');
        }

        const searchResult = findMoviesByName(movies, movieSearch);

        saveDataToLocalStorage('searchString', movieSearch);
        saveDataToLocalStorage('searchResults', searchResult);
        setFoundMovies(searchResult);
        setIsLoading(false);
    }

    const onSaveMovie = (movie) => { 
        const newSavedMovies = savedMovies;
        newSavedMovies.unshift(movie);
        saveDataToLocalStorage('savedCollection', newSavedMovies);
        setSavedMovies([...newSavedMovies]);
    }

    const onDeleteMovie = (id) => {
        const index = savedMovies.map(c => c.movieId).indexOf(id);
        let newSavedMovies = savedMovies;
        newSavedMovies.splice(index, 1);
        saveDataToLocalStorage('savedCollection', newSavedMovies);
        setSavedMovies([...newSavedMovies]);
    }

    const preloadSavedMovies = async () => {
        let movies;
        if(!localStorage.savedCollection) {
            movies = await loadSavedMovies();
        } else {
            movies = getDataFromLocalStorage('savedCollection');
        }
        setSavedMovies(movies);
    }

    useEffect(() => {
        if(!localStorage.searchString || !localStorage.searchResults) {
            return;
        }

        const searchString = getDataFromLocalStorage('searchString');
        const searchResult = getDataFromLocalStorage('searchResults');
        const durationFlag = getDataFromLocalStorage('durationFlag');

        if(durationFlag) {
            setIsDurationFilterActive(durationFlag);
        }

        preloadSavedMovies();
        setFoundMovies(searchResult);
        setInitialSearch(searchString);
    }, []);

    useEffect(() => {
        let movies;

        if(isDurationFilterActive) {
            movies = filterMoviesByDuration(foundMovies);
        } else {
            movies = foundMovies;
        }
        setMoviesToDisplay(movies);
    }, [isDurationFilterActive, foundMovies]);

    useEffect(() => {
        saveDataToLocalStorage('durationFlag', isDurationFilterActive);
    }, [isDurationFilterActive]);

    return (
        <>
            <Header isLoggedIn={isLoggedIn}/>
            <SearchForm
                initialSearch={initialSearch}
                onSearch={onSearch} 
                durationFlag={isDurationFilterActive}
                onDisplayShortMovies={setIsDurationFilterActive}
            />
            {isLoading && (<Preloader/>)}
            <MoviesList 
                movies={moviesToDisplay}
                savedMovies={savedMovies}
                onSave={onSaveMovie}
                onDelete={onDeleteMovie}
                searchResultsLength={moviesToDisplay.length}
            />
            <Footer/>
        </>
    )
}

export default Movies;