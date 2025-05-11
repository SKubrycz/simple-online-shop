import { Link } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <h1>Sklep internetowy</h1>
      <h2>Dowiedz się co możesz zamówić:</h2>
      <Link reloadDocument to="/product-list">
        Przeglądaj listę produktów
      </Link>
    </>
  );
}

export default App;
