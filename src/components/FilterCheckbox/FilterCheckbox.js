import './FilterCheckbox.css'
function FilterCheckbox({handleShortMoviesCheckboxClick, checkboxValue}) {
    return (
        <>
            <div className="short-films">
                <input className="short-films__checkbox" type="checkbox" checked={checkboxValue} onChange={handleShortMoviesCheckboxClick}
                />
                <span className="short-films__span">Короткометражки</span>
            </div>
        </>
    )
}

export default FilterCheckbox; 