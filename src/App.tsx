import { Link } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <h1>Online shop</h1>
      <h2>Find out what you can order here:</h2>
      <Link to="/product-list">Browse product list</Link>
    </>
  );
}

export default App;
