import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
import Preloader from "../Preloader/Preloader";
import { useLocation } from 'react-router-dom';
import { useMoviesFiltration } from "../../utils/hooks/useMoviesFiltration"
import { useEffect, useState } from 'react';
//import { getSavedMovies } from '../../utils/api/MainApi';
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

    // const loadSavedMovies = async () => {
    //     return await getSavedMovies();
    // }

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

        // let savedMovies;
        // if(!localStorage.collection) {
        //     savedMovies = await loadSavedMovies();
        // } else {
        //     savedMovies = getDataFromLocalStorage('savedCollection');
        // }

        // console.log('savedMovies', savedMovies);

        const searchResult = findMoviesByName(movies, movieSearch);

        saveDataToLocalStorage('searchString', movieSearch);
        saveDataToLocalStorage('searchResults', searchResult);
        setFoundMovies(searchResult);
        //setSavedMovies(savedMovies);
        setIsLoading(false);
    }

    const onSaveMovie = () => {

    }

    const onDeleteMovie = () => {

    }

    useEffect(() => {
        if(!localStorage.searchString || !localStorage.searchResults) {
            return;
        }

        const searchString = getDataFromLocalStorage('searchString');
        const searchResult = getDataFromLocalStorage('searchResults');

        setFoundMovies(searchResult);
        setInitialSearch(searchString);
    }, []);

    useEffect(() => {
        let movies;

        if(isDurationFilterActive) {
            movies = filterMoviesByDuration(foundMovies)
        } else {
            movies = foundMovies;
        }

        setMoviesToDisplay(movies);
    }, [isDurationFilterActive, foundMovies]);

    return (
        <>
            <Header isLoggedIn={isLoggedIn}/>
            <SearchForm
                initialSearch={initialSearch}
                onSearch={onSearch} 
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