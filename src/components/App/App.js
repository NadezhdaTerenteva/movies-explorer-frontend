import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  return (
    <div className="app">
      <Header></Header>
      <Main>
      </Main>
      <Movies></Movies>
      <Footer></Footer>
    </div>
  );
}

export default App;
