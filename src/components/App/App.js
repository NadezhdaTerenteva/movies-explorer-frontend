import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

import './App.css';



function App() {
  return (
    <div className="app">
      <Header></Header>
      <Main>
      </Main>
      <Movies></Movies>
      <SavedMovies></SavedMovies>
      <Profile></Profile>
      <Register></Register>
      <Login></Login>
      <NotFound></NotFound>
      <Footer></Footer>
    </div>
  );
}

export default App;
