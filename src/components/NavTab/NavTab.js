import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab">
      <nav>
        <ul className="nav-tab__links"> 
          <li>
            <a href="#about-project" className="nav-tab__link">О проекте</a>
          </li>
          <li>
            <a href="#techs" className="nav-tab__link">Технологии</a>
          </li>
          <li>
            <a href="#about-me" className="nav-tab__link">Студент</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;