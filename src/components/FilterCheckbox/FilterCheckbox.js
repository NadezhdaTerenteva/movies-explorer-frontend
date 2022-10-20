import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label for="filter-checkbox_default" className="checkbox">
        <input type="checkbox" id="filter-checkbox_default" className="filter-checkbox__input"/>
        <div className="filter-checkbox__state">
          <div className="filter-checkbox__control">
            <div className="filter-checkbox__inner"></div>
          </div>
          <p className="filter-checkbox__title">Короткометражки</p>
        </div>
      </label>
      
    </div>
  );
}

export default FilterCheckbox;