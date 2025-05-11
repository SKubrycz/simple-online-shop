import { useEffect, useState } from "react";
import SummaryItem from "../components/SummaryItem";
import useLocalStorage from "../hooks/useLocalStorage";
import { getPartialSum } from "../utils/getPartialSum";
import { Link } from "react-router";

export default function OrderSummary() {
  const [value] = useLocalStorage("cart");
  const [sum, setSum] = useState(0);

  function handleSum() {
    if (Array.isArray(value)) {
      value.forEach((el) => {
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
      <h1>Order Summary</h1>
      {Array.isArray(value) ? (
        value.map((el, i) => {
          return <SummaryItem key={i} cartItemInfo={el}></SummaryItem>;
        })
      ) : (
        <></>
      )}
      <h2 className="sum">Razem: {sum}</h2>
      <Link reloadDocument to="/order-confirmation">
        <button>Złóż zamówienie</button>
      </Link>
    </>
  );
}
