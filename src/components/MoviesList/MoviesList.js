import MoviesCard from "../MoviesCard/MoviesCard";
import { movies } from '../../utils/movies'
import "./MoviesList.css"

function MoviesList({ locationPath, foundedMovies }) {
    return (
        <>
            <div className="movies">
                <ul className="movies__card-list">
                    {
                        foundedMovies.map((movieItem, index) => (
                            <MoviesCard key={index} cardMovie={movieItem} />
                        ))
                    }
                </ul>

                {
                    locationPath === '/movies' ?
                        <div className="movies__show-more">
                            {/* тестовый код для кнопки, который был на прошлом этапе  */}
                            <button className={movies.length >= 5 ? 'show-more__button_visible' : 'show-more__button_hidden'}>Еще</button>
                        </div> : null
                }

            </div>
        </>
    )
}

export default MoviesList; 