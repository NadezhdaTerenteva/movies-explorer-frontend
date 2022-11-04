import { useLocation } from 'react-router-dom';
import useScreenWidth from '../../hooks/useScreenWidth';

import './MoviesCardList.css';

function MoviesCardList({ children }) {

  const screenWidth = useScreenWidth();
  const location = useLocation();

 // добавление карточек при клике "Еще"
 function handleClickShowMore() {
  // const start = showMovieList.length;
  // const end = start + cardsShowDetails.more;
  // const additional = moviesList.length - start;

  // if (additional > 0) {
  //   const newCards = moviesList.slice(start, end);
  //   setShowMovieList([...showMovieList, ...newCards]);
  // }
}  

  return (
    
    <section className="movies-card-list">
        { children }
    </section>
  );
}

export default MoviesCardList;