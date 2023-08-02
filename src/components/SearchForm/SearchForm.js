import searchLogo from "../../images/searchLogo.svg"
import './SearchForm.css'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
function SearchForm() {
    return (
        <>
            <section class="search">
                <div className="search__container">
                    <form class="search__form">
                        <div className="search__content">
                            <img src={searchLogo} alt="лого лупа" class="search__logo" />
                            <input type="text" class="search__input" placeholder="Фильм" />
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