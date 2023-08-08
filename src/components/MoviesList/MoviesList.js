import MoviesCard from "../MoviesCard/MoviesCard";
import { SCREEN_SIZE_REGULAR, SCREEN_SIZE_MIDDLE } from "../../utils/constants/breakpoints";
import { useLocation } from 'react-router-dom';
import "./MoviesList.css"
import { useEffect, useState } from "react";

function MoviesList({ movies, savedMovies, onSave, onDelete, searchResultsLength }) {
    const [moviesToDisplay, setMoviesToDisplay] = useState([]);
    const location = useLocation();
    const isLoadMoreAvailable = moviesToDisplay.length < searchResultsLength;
    const moviesLeft = searchResultsLength - moviesToDisplay.length;
    const isSavedMoviesPage = location.pathname === '/saved-movies';

    const getNumberOfMoviesToDisplay = () => {
        if (window.innerWidth >= SCREEN_SIZE_REGULAR) {
            return 12;
        }
        if (window.innerWidth >= SCREEN_SIZE_MIDDLE) {
            return 8;
        }
        if (window.innerWidth < SCREEN_SIZE_MIDDLE) {
            return 5;
        }
    }

    const getNumberOfMoviesToAdd = () => {
        return window.innerWidth >= SCREEN_SIZE_REGULAR ? 3 : 2;
    }

    const prepareData = (numberOfMoviesToDisplay) => {
        if (!movies) {
            return;
        }
        const moviesToDisplay = movies.slice(0, numberOfMoviesToDisplay);
        setMoviesToDisplay(moviesToDisplay);
    }

    const handleLoadMore = () => {
        const loadMoreLength = getNumberOfMoviesToAdd();
        const finalNumberOfMoviesToLoad = loadMoreLength > moviesLeft ? moviesLeft : loadMoreLength;
        const numberOfMoviesToDisplay = moviesToDisplay.length + finalNumberOfMoviesToLoad;
        prepareData(numberOfMoviesToDisplay);
    }

    const areSavedMoviesAvailable = () => {
        return localStorage.savedCollection?.length > 0;
    }

    const areSearchResultsAvailable = () => {
        return localStorage.searchResults?.length > 0;  
    }

    const isDataAvailable = () => {
        return isSavedMoviesPage ? areSavedMoviesAvailable() : areSearchResultsAvailable();
    }

    const NotFoundMessage = () => {
        return (
            <h2 className="movies__message">
                По Вашему запросу ничего не найдено
            </h2>
        );
    }

    const NoMoviesMessage = () => {
        return isSavedMoviesPage ? (
            <h2 className="movies__message">
                У Вас нет сохраненных фильмов
            </h2>) : (<h2 className="movies__message">
                Введите запрос для поиска фильмов
            </h2>
        );
    }

    const CardList = () => {
        if (moviesToDisplay.length > 0) {
            return (moviesToDisplay.map((movieItem) => (
                <MoviesCard key={movieItem.toString()} cardMovie={movieItem} savedMovies={savedMovies} onSave={onSave} onDelete={onDelete} />
            )));
        } else {
            return (
                <NotFoundMessage />
            );
        }
    }

    const LoadMoreButton = () => {
        return (
            <div className="movies__show-more">
                <button className={'show-more__button_visible'} onClick={handleLoadMore}>
                    Еще
                </button>
            </div>
        );
    }

    useEffect(() => {
        const numberOfMoviesToDisplay = getNumberOfMoviesToDisplay();
        prepareData(numberOfMoviesToDisplay);
    }, [movies])

    return (
        <>
            <div className="movies">
                <ul className="movies__card-list">
                    {isDataAvailable() ? (<CardList />) : (<NoMoviesMessage/>)}
                </ul>
                {isLoadMoreAvailable && (<LoadMoreButton />)}
            </div>
        </>
    )
}

export default MoviesList; 