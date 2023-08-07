import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from 'react-router-dom';
import "./MoviesList.css"

function MoviesList({ moviesCollection }) {
    const location = useLocation();
    return (
        <>
            <div className="movies">
                <ul className="movies__card-list">
                    {
                        moviesCollection.map((movieItem, index) => (
                            <MoviesCard key={index} cardMovie={movieItem} />
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

// {
//     location.pathname === '/movies' ?
//         <div className="movies__show-more">
//             {/* тестовый код для кнопки, который был на прошлом этапе  */}
//             <button className={movies.length >= 5 ? 'show-more__button_visible' : 'show-more__button_hidden'}>Еще</button>
//         </div> : null
// }

export default MoviesList; 