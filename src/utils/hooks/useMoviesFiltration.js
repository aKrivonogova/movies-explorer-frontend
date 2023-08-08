export function useMoviesFiltration() {
    const findMoviesByName = (movies, name) => {
        return movies.filter((movie) => movie.nameRU.includes(name) || movie.nameEN.includes(name));
    }
    
    const filterMoviesByDuration = (movies, duration = 40) => {
        return movies.filter((movie) => movie.duration <= duration);
    }

    return { findMoviesByName, filterMoviesByDuration }
} 