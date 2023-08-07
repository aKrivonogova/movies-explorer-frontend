import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
import Preloader from "../Proloader/Preloader";
function Movies({ isLoggedIn, locationPath, isLoading, handleFilterMovies, foundedMovies }) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn}></Header>
            <SearchForm handleFilterMovies={handleFilterMovies}></SearchForm>
            {isLoading && (<Preloader />)}
            <MoviesList locationPath={locationPath} foundedMovies={foundedMovies}></MoviesList>
            <Footer></Footer>
        </>
    )
}

export default Movies;