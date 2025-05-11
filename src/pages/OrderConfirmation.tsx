import { useEffect, useState } from "react";
import SummaryItem from "../components/SummaryItem";
import useLocalStorage from "../hooks/useLocalStorage";
import type { CartProduct } from "../types/products";
import { Link } from "react-router";

export default function OrderConfirmation() {
  const [cart, setCart] = useLocalStorage("cart");
  const [summary, setSummary] = useState<CartProduct[] | null>(null);

  useEffect(() => {
    // Pass the data to the summary state and clear the localStorage cart
    setSummary(cart);
    setCart([]);
  }, []);

  return (
    <>
      <h1>Potwierdzenie zamówienia</h1>
      {Array.isArray(summary) && summary.length > 0 && (
        <h3 className="success">Zamówienie złożone pomyślnie!</h3>
      )}
      {Array.isArray(summary) &&
        summary.map((el, i) => {
          return <SummaryItem key={i} cartItemInfo={el}></SummaryItem>;
        })}
      <Link to="/product-list">
        <h3>Powrót do listy produktów</h3>
      </Link>
    </>
  );
}
