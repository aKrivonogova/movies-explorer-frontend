export function useMoviesFiltration() {
    const findMoviesByName = (movies, name) => {
        return movies.filter((movie) => 
            movie.nameRU.toLowerCase().includes(name.toLowerCase()) || 
            movie.nameEN.toLowerCase().includes(name.toLowerCase()));
    }
    
    const filterMoviesByDuration = (movies, duration = 40) => {
        return movies.filter((movie) => movie.duration <= duration);
    }

    return { findMoviesByName, filterMoviesByDuration }
} 