import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
import Preloader from "../Proloader/Preloader";
function Movies({ loggedIn, locationPath, isLoading }) {
    return (
        <>
            <SearchForm></SearchForm>
            {isLoading && (<Preloader/>)}
            <MoviesList locationPath={locationPath}></MoviesList>
        </>
    )
}

export default Movies;