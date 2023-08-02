
import './MoviesCard.css'
function MoviesCard({ card, locationPath }) {
    const saveMovieButton = () => (<button className={`movies__card-button  ${card.saved ? ('movies__card-button_save') : ('movies__card-button_not-save')}`}></button>)
    const deleteMovieButton = () => (<button className="movies__card-button movies__card-button_delete"></button>)
    return (
        <>
            <li className="movies__card-item">
                <div className="movies__card-heading">
                    <div className="movies__card-options">
                        <p className="movies__card-title">{card.movieName}</p>
                        <p className="movies__card-duration">{card.duration}</p>
                    </div>

                    {
                        locationPath === '/movies' ? saveMovieButton() : deleteMovieButton()
                    }
                </div>
                <img src={card.moviePoster} alt="постер фильма" className="movies__card-image" />
            </li>
        </>
    )
}

export default MoviesCard;