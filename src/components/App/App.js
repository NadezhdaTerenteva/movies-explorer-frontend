import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header></Header>
      <Main>
      </Main>
      <Movies></Movies>
      <SavedMovies></SavedMovies>
      <Register></Register>
      <Login></Login>
      <Footer></Footer>
    </div>
  );
}

export default App;
