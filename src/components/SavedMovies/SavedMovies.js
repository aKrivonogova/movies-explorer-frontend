import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
import Preloader from "../Preloader/Preloader";
import { useMoviesFiltration } from "../../utils/hooks/useMoviesFiltration"
import { useEffect, useState } from 'react';
import { getSavedMovies } from '../../utils/api/MainApi';

function SavedMovies({ isLoggedIn }) {
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

    const loadCollection = async () => {
        const movies = await loadSavedMovies();
        saveDataToLocalStorage('savedCollection', movies);
        return movies;
    }

    const onSearch = async ({movieSearch}) => {
        setIsLoading(true);

        let movies;
        if(!localStorage.savedCollection) {
            movies = await loadCollection();
        } else {
            movies = getDataFromLocalStorage('savedCollection');
        }
        const searchResult = findMoviesByName(movies, movieSearch);
        saveDataToLocalStorage('savedSearchString', movieSearch); 
        setFoundMovies([...searchResult]);
        setSavedMovies([...movies]);
        setIsLoading(false);
    }

    const onSaveMovie = () => {
        return;
    }


    const onDeleteMovie = (id) => {
        const index = savedMovies.map(c => c.movieId).indexOf(id);
        let newSavedMovies = savedMovies;
        newSavedMovies.splice(index, 1);
        saveDataToLocalStorage('savedCollection', newSavedMovies);
        const searchString = getDataFromLocalStorage('savedSearchString');
        setSavedMovies([...newSavedMovies]);
        onSearch({movieSearch: searchString});
    }

    useEffect(() => {
        let searchString= "";

        // if(localStorage.savedSearchString){
        //     searchString = getDataFromLocalStorage('savedSearchString');
        // } else {
        //     searchString = "";
        // }  

        setInitialSearch(searchString);
        onSearch({movieSearch: ""});
    }, []);

    useEffect(() => {
        let movies;

        if(isDurationFilterActive) {
            movies = filterMoviesByDuration(foundMovies)
        } else {
            movies = foundMovies;
        }

        setMoviesToDisplay([...movies]);
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

export default SavedMovies;