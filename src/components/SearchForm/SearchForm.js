import searchLogo from "../../images/searchLogo.svg"
import './SearchForm.css'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"; 
import { useEffect, useState } from "react";
function SearchForm({ initialSearch, onSearch, onDisplayShortMovies }) {

    const [movieSearch, setMovieSearch] = useState('');
    const [isShortMoviesOnly, setIsShortMoviesOnly] = useState(false);
    const [searchErrorMessage, setSearchErrorMessage] = useState('');

    const isFormValid = () => {
        return movieSearch.length >= 1;
    }

    const handleShortMoviesCheckboxClick = () => {
        setIsShortMoviesOnly(!isShortMoviesOnly);
        onDisplayShortMovies(!isShortMoviesOnly);
    }

    const handleSearchInput = (event) => {
        setMovieSearch(event.target.value);
        setSearchErrorMessage('');
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            onSearch({movieSearch: movieSearch});
        }
        else {
            setSearchErrorMessage('Необходимо ввести ключевое слово');
        }
    }

    useEffect(() => {
        if(initialSearch !== ''){
            setMovieSearch(initialSearch);
        }
    }, [initialSearch]);

    return (
        <>
            <section className="search">
                <div className="search__container">
                    <form className="search__form" onSubmit={handleSearchSubmit}>
                        <div className="search__content">
                            <img src={searchLogo} alt="лого лупа" className="search__logo" />
                            <fieldset className="search__feilds">
                                <input type="text" className="search__input" placeholder="Фильм" onChange={handleSearchInput} value={movieSearch} />
                                <span className="search__input-error">{searchErrorMessage}</span>
                            </fieldset>
                            <button className="search__button"></button>
                        </div>
                        <FilterCheckbox handleShortMoviesCheckboxClick={handleShortMoviesCheckboxClick} checkboxValue={isShortMoviesOnly}/>
                    </form>
                </div>
            </section>

        </>
    )
}
export default SearchForm;