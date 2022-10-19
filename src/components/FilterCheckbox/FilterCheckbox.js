import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="filter-checkbox">
      <label for='toggler_default' class='toggler'>
        <input type='checkbox' id='toggler_default' class='toggler__input'/>
        <div class='toggler__state'>
          <div class='toggler__control'>
            <div class='toggler__inner'></div>
          </div>
          <div class='toggler__title'>Короткометражки</div>
        </div>
      </label>
    </div>
  );
}

export default FilterCheckbox;