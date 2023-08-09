import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { saveNewMovie, deleteCard } from "../../utils/api/MainApi";
import { useEffect, useState } from "react";
function MoviesCard({ cardMovie, savedMovies, onSave, onDelete }) {
    const [isInFavorites, setIsInFavorites] = useState(false);

    const calculateIsInFavorites = () => {
        return !!(savedMovies.length > 0
            ? savedMovies.find((movie) => movie?.movieId === cardMovie.id)
            : ``);
    };

    const location = useLocation();
    const isMoviesPage = location.pathname === "/movies";

    const SaveMovieButton = () => {
        const className = `movies__card-button  ${
            isInFavorites
                ? "movies__card-button_save"
                : "movies__card-button_not-save"
        }`;
        return (
            <button
                className={className}
                onClick={
                    isInFavorites ? removeCardFromFavorites : addCardToFavorites
                }
            ></button>
        );
    };

    const DeleteMovieButton = () => {
        return (
            <button
                className="movies__card-button movies__card-button_delete"
                onClick={removeCardFromFavorites}
            ></button>
        );
    };

    const bringToFormatUrl = (imageLocalPath) => {
        return `https://api.nomoreparties.co${imageLocalPath}`;
    };

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
        };

        saveNewMovie(payload)
            .then((newMovie) => {
                onSave(newMovie);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const removeCardFromFavorites = () => {
        const id = isMoviesPage ? cardMovie.id : cardMovie.movieId;

        deleteCard(id)
            .then((deletedMovie) => {
                onDelete(id);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const convertTime = (mins) => {
        const hours = Math.trunc(mins / 60);
        const minutes = mins % 60;
        return hours + "ч " + minutes + "м";
    };

    useEffect(() => {
        setIsInFavorites(calculateIsInFavorites());
    }, [savedMovies]);

    return (
        <>
            <li className="movies__card-item">
                <div className="movies__card-heading">
                    <div className="movies__card-options">
                        <p className="movies__card-title">{cardMovie.nameRU}</p>
                        <p className="movies__card-duration">
                            {convertTime(cardMovie.duration)}
                        </p>
                    </div>
                    {isMoviesPage ? SaveMovieButton() : DeleteMovieButton()}
                </div>
                <a href={cardMovie.trailerLink}>
                    <img
                        src={
                            isMoviesPage
                                ? bringToFormatUrl(cardMovie.image.url)
                                : cardMovie.image
                        }
                        alt="постер фильма"
                        className="movies__card-image"
                    />
                </a>
            </li>
        </>
    );
}

export default MoviesCard;
