import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__header">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
    <a href="https://yandex.ru/maps" target="_blank" rel="noreferrer" className="not-found__link">Назад</a>
    </section>
  );
}

export default NotFound;