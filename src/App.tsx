import { Link } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <h1>Sklep internetowy</h1>
      <h2>Dowiedz się co możesz zamówić:</h2>
      <Link reloadDocument to="/product-list">
        <h3>Przeglądaj listę produktów</h3>
      </Link>
    </>
  );
}

export default App;
