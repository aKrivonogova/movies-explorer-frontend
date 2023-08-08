
import './MoviesCard.css'
import { useLocation } from 'react-router-dom';
import { saveNewMovie, deleteCard } from '../../utils/api/MainApi';
function MoviesCard({ cardMovie, savedMovies, onSave, onDelete }) {

    const calculateIsInFavorites = () => {
        return !!(savedMovies ? savedMovies.find((movie) => movie.movieId === cardMovie.id) : ``);
    }

    const location = useLocation();
    const isInFavorites = calculateIsInFavorites();
    const isMoviesPage = location.pathname === '/movies';

    const SaveMovieButton = () => {
        const className = `movies__card-button  ${isInFavorites ? ('movies__card-button_save') : ('movies__card-button_not-save')}`;
        return (
            <button className={className} onClick={isInFavorites ? removeCardFromFavorites : addCardToFavorites}></button>
        );
    }

    const DeleteMovieButton = () => {
        return (
            <button className="movies__card-button movies__card-button_delete" onClick={removeCardFromFavorites}>
            </button>
        );
    }

    const bringToFormatUrl = (imageLocalPath) => {
        return `https://api.nomoreparties.co${imageLocalPath}`
    }


    const addCardToFavorites = () => {
        const payload = {
            country: cardMovie.country,
            director: cardMovie.director,
            duration: cardMovie.duration,
            year: cardMovie.year,
            description: cardMovie.description,
            image: bringToFormatUrl(cardMovie.image.url),
            trailerLink: cardMovie.trailerLink,
            nameRU: cardMovie.nameRU,
            nameEN: cardMovie.nameEN,
            thumbnail: bringToFormatUrl(cardMovie.image.formats.thumbnail.url),
            movieId: cardMovie.id,
        }

        saveNewMovie(payload).then((newMovie) => {
            onSave(newMovie);
        })
            .catch((err) => {
                console.error(err);
            })
    }

    const removeCardFromFavorites = () => {
        const id = isMoviesPage ? savedMovies.find((movie) => movie.movieId === cardMovie.id).id : cardMovie.id;

        deleteCard(id).then((deletedMovie) => {
            onDelete(deletedMovie);
        })
            .catch((err) => {
                console.error(err);
            })
    }

    const convertTime = (mins) => {
        const hours = Math.trunc(mins / 60);
        const minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    }

    return (
        <>
            <li className="movies__card-item">
                <div className="movies__card-heading">
                    <div className="movies__card-options">
                        <p className="movies__card-title">{cardMovie.nameRU}</p>
                        <p className="movies__card-duration">{convertTime(cardMovie.duration)}</p>
                    </div>
                    {
                        isMoviesPage ? SaveMovieButton() : DeleteMovieButton()
                    }
                </div>
                <a href={cardMovie.trailerLink}>
                    <img src={bringToFormatUrl(cardMovie.image.url)} alt="постер фильма" className="movies__card-image" />
                </a>
            </li>
        </>
    )
}

export default MoviesCard;