import './FilterCheckbox.css'
function FilterCheckbox() {
    return (
        <>
            <div className="short-films">
                <input className="short-films__checkbox"
                    type="checkbox"
                />
                <span className="short-films__span">Короткометражки</span>
            </div>
        </>
    )
}

export default FilterCheckbox; 