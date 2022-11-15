import { useHistory } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const history = useHistory();

  const backOnClick = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__header">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
        <button onClick={backOnClick} className="not-found__link">
        Назад
      </button>
      </div>
      {/* <Link to ="../" className="not-found__link">Назад</Link> */}
      
    </section>
  );
}

export default NotFound;
