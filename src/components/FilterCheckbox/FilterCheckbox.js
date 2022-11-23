import './FilterCheckbox.css';

function FilterCheckbox({ value, onChangeHandler, title}) {
  return (
    <section className="filter-checkbox">
      <label htmlFor="filter-checkbox_default" className="checkbox">
        <input 
          type="checkbox" 
          id="filter-checkbox_default" 
          className="filter-checkbox__input"
          onChange={onChangeHandler}
          checked={value}
        />
        <div className="filter-checkbox__state">
          <div className="filter-checkbox__control">
            <div className="filter-checkbox__inner"></div>
          </div>
          <p className="filter-checkbox__title">{title}</p>
        </div>
      </label>
    </section>
  );
}

export default FilterCheckbox;