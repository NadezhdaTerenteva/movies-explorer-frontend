import { Link, useLocation, useHistory } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const location = useLocation();
  const history = useHistory(); console.log(history);console.log(location);
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__header">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
    <Link to ="../" className="not-found__link">Назад</Link>
    </section>
  );
}

export default NotFound;