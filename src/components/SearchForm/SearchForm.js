import searchLogo from "../../images/searchLogo.svg"
import './SearchForm.css'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";
function SearchForm({ handleFilterMovies }) {

    const [movieSearch, setMovieSearch] = useState('');
    const [isValidForm, setIsValidForm] = useState(false);
    const [searchErrorMessage, setSearchErrorMessage] = useState('');

    const checkFormValid = (event) => {
        event.target.value.length >= 1 ? setIsValidForm(true) : setIsValidForm(false);
    }

    const handleSearchInput = (event) => {
        setMovieSearch(event.target.value);
        checkFormValid(event);
        setSearchErrorMessage('');
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (isValidForm) {
            handleFilterMovies(movieSearch)
        }
        else {
            setSearchErrorMessage('Необходимо ввести ключевое слово');
        }
    }

    return (
        <>
            <section class="search">
                <div className="search__container">
                    <form class="search__form" onSubmit={handleSearchSubmit}>
                        <div className="search__content">
                            <img src={searchLogo} alt="лого лупа" class="search__logo" />
                            <fieldset className="search__feilds">
                                <input type="text" class="search__input" placeholder="Фильм" onChange={handleSearchInput} value={movieSearch} />
                                <span className="search__input-error">{searchErrorMessage}</span>
                            </fieldset>
                            <button class="search__button"></button>
                        </div>
                        <FilterCheckbox></FilterCheckbox>
                    </form>
                </div>
            </section>

        </>
    )
}
export default SearchForm;