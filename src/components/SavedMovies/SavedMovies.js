import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
function SavedMovies({ loggedIn, locationPath }) {
    return (
        <>
            <SearchForm></SearchForm>
            <MoviesList locationPath={locationPath}></MoviesList>
        </>
    )
}

export default SavedMovies;