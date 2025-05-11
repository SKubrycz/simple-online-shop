import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import useLocalStorage from "../hooks/useLocalStorage";
import type { CartProduct, Sign } from "../types/products";
import { Link } from "react-router";
import { getPartialSum } from "../utils/getPartialSum";

export default function ShoppingCart() {
  const [cart, setCart] = useLocalStorage("cart");
  const [sum, setSum] = useState(0);

  function handleAdjustAmount(sign: Sign, id: number) {
    let updatedValue = null;

    if (Array.isArray(cart)) {
      // If there is an id found, remap its 'amount' property
      const newValueArray = cart.map((el: CartProduct, i) => {
        if (el.id === id) {
          let updatedItem;
          if (sign === "-") {
            updatedItem = {
              ...el,
              amount: el.amount ? el.amount - 1 : 1,
            };
          } else if (sign === "+") {
            updatedItem = {
              ...el,
              amount: el.amount ? el.amount + 1 : 1,
            };
          }

          updatedValue = [...cart];
          updatedValue[i] = updatedItem;
          return updatedItem;
        }
        return el;
      });

      // Update with the new amount
      if (updatedValue) {
        setCart(newValueArray);
      }
    }
  }

  function handleDeleteCartItem(id: number) {
    if (Array.isArray(cart)) {
      const found = cart.find((el: CartProduct) => el.id == id);
      const newValueArray = [...cart];
      const index = newValueArray.indexOf(found);
      newValueArray.splice(index, 1); // Remove and element at given index...
      setCart(newValueArray); // ...and replace the array
    }
  }

  function handleCartSum() {
    if (Array.isArray(cart)) {
      let sum = 0;
      cart.forEach((el) => {
        const productSum = getPartialSum(
          el.price.main,
          el.price.fractional,
          el.amount
        );
        sum += productSum;
      });
      setSum(sum);
    }
  }

  useEffect(() => {
    handleCartSum(); // Recalculate each time the cart array changes
  }, [cart]);

  return (
    <>
      <Link to="/product-list">{"<"}Powrót do listy produktów</Link>
      <h1>Koszyk zakupów</h1>
      {Array.isArray(cart) &&
        cart.map((el, i) => {
          return (
            <CartItem
              key={i}
              cartItemInfo={el}
              adjustAmount={handleAdjustAmount}
              deleteCartItem={handleDeleteCartItem}
            ></CartItem>
          );
        })}
      <h2 className="sum">Razem: {sum.toFixed(2)}</h2>
      {Array.isArray(cart) && cart.length > 0 ? (
        <Link to="/order-summary">
          <button>Przejdź do podsumowania</button>
        </Link>
      ) : (
        <button disabled={true}>Przejdź do podsumowania</button>
      )}
    </>
  );
}
