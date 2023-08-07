import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
function SavedMovies({ isLoggedIn, locationPath }) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn}></Header>
            <SearchForm></SearchForm>
            <MoviesList locationPath={locationPath}></MoviesList>
            <Footer></Footer>
        </>
    )
}

export default SavedMovies;