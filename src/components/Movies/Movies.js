import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
import Preloader from "../Proloader/Preloader";
function Movies({ isLoggedIn, locationPath, isLoading }) {
    return (
        <>
            <Header isLoggedIn={isLoggedIn}></Header>
            <SearchForm></SearchForm>
            {isLoading && (<Preloader />)}
            <MoviesList locationPath={locationPath}></MoviesList>
            <Footer></Footer>
        </>
    )
}

export default Movies;