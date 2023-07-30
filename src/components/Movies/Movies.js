import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesList from "../MoviesList/MoviesList";
function Movies({ loggedIn, locationPath }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <SearchForm></SearchForm>
            <MoviesList locationPath={locationPath}></MoviesList>
            <Footer></Footer>
        </>
    )
}

export default Movies;