
import './MoviesCard.css'
function MoviesCard({ cardMovie, locationPath }) {
    // вот эта логика работала только в прошлой ветке
    // поля saved больше нет, надо плясать от чего-то другого
    // что-то вроде 
    const saveMovieButton = () => (<button className={`movies__card-button  ${cardMovie.saved ? ('movies__card-button_save') : ('movies__card-button_not-save')}`}></button>)
    const deleteMovieButton = () => (<button className="movies__card-button movies__card-button_delete"></button>)
    return (
        <>
            <li className="movies__card-item">
                <div className="movies__card-heading">
                    <div className="movies__card-options">
                        <p className="movies__card-title">{cardMovie.nameRU}</p>
                        <p className="movies__card-duration">{cardMovie.duration}</p>
                    </div>

                    {
                        locationPath === '/movies' ? saveMovieButton() : deleteMovieButton()
                    }
                </div>
                <a href={cardMovie.trailerLink}>
                    <img src={`https://api.nomoreparties.co${cardMovie.image.url}`} alt="постер фильма" className="movies__card-image" />
                </a>
            </li>
        </>
    )
}

export default MoviesCard;