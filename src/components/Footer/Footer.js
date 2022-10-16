import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h5 className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</h5>
      <nav className="footer__nav">
        <p className="footer__copyright">&copy;2022</p>
        <ul className="footer__links"> 
          <li> 
            <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="footer__link">Яндекс.Практикум</a>
          </li>
          <li> 
            <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="footer__link">Github</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;