import MoviesCard from "../MoviesCard/MoviesCard";
import { movies } from '../../utils/movies'
import "./MoviesList.css"

function MoviesList({ locationPath }) {
    return (
        <>
            <div className="movies">
                <ul className="movies__card-list">
                    {
                        movies.map((card, index) => (
                            <MoviesCard locationPath={locationPath} card={card} />
                        ))
                    }
                </ul>
                <div className="movies__show-more">
                    <button className={movies.length >= 10 ? 'show-more__button_visible' : 'show-more__button_hidden'}>Еще</button>
                </div>
            </div>
        </>
    )
}

export default MoviesList; 