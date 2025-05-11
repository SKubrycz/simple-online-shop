import { useEffect, useState } from "react";
import SummaryItem from "../components/SummaryItem";
import useLocalStorage from "../hooks/useLocalStorage";
import { getPartialSum } from "../utils/getPartialSum";
import { Link } from "react-router";

export default function OrderSummary() {
  const [cart] = useLocalStorage("cart");
  const [sum, setSum] = useState(0);

  function handleSum() {
    if (Array.isArray(cart)) {
      cart.forEach((el) => {
        const partialSum = getPartialSum(
          el.price.main,
          el.price.fractional,
          el.amount
        );
        setSum((previous) => previous + partialSum);
      });
    }
  }

  useEffect(() => {
    handleSum();
  }, []);

  return (
    <>
      <Link to="/shopping-cart">{"<"} Powrót do koszyka</Link>
      <h1>Podsumowanie zamówienia</h1>
      {Array.isArray(cart) &&
        cart.map((el, i) => {
          return <SummaryItem key={i} cartItemInfo={el}></SummaryItem>;
        })}
      <h2 className="sum">Razem: {sum.toFixed(2)}</h2>
      {/* Disable the button if there are no items in the shopping cart */}
      {Array.isArray(cart) && cart.length > 0 ? (
        <Link reloadDocument to="/order-confirmation">
          <button>Złóż zamówienie</button>
        </Link>
      ) : (
        <button disabled={true}>Złóż zamówienie</button>
      )}
    </>
  );
}
