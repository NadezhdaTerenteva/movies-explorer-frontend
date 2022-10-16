import './NavTab.css';

function NavTab() {
  return (
    <section className="nav-tab">
      <nav>
        <ul className="nav-tab__links"> 
          <li>
            <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="nav-tab__link">О проекте</a>
          </li>
          <li>
            <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="nav-tab__link">Технологии</a>
          </li>
          <li>
            <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="nav-tab__link">Студент</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;