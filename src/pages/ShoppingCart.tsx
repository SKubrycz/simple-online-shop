import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import useLocalStorage from "../hooks/useLocalStorage";
import type { CartProduct, Sign } from "../types/products";
import { Link } from "react-router";

export default function ShoppingCart() {
  const [value, setValue] = useLocalStorage("cart");
  const [sum, setSum] = useState(0);

  function handleAdjustAmount(sign: Sign, id: number) {
    let updatedValue = null;

    if (Array.isArray(value)) {
      const newValueArray = value.map((el: CartProduct, i) => {
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

          updatedValue = [...value];
          updatedValue[i] = updatedItem;
          return updatedItem;
        }
        return el;
      });

      if (updatedValue) {
        setValue(newValueArray);
      }
    }
  }

  function handleDeleteCartItem(id: number) {
    if (Array.isArray(value)) {
      const found = value.find((el: CartProduct) => el.id == id);
      const newValueArray = [...value];
      const index = newValueArray.indexOf(found);
      newValueArray.splice(index, 1);
      setValue(newValueArray);
    }
  }

  function handleCartSum() {
    if (Array.isArray(value)) {
      value.forEach((el) => {
        const main = el.price.main;
        const fractional = el.price.fractional / 100;
        let productSum = main * el.amount + fractional * el.price.fractional;

        setSum((previous) => previous + productSum);
      });
    }
  }

  useEffect(() => {
    handleCartSum();
  }, []);

  return (
    <>
      <Link to="/product-list">{"<"}Powrót do listy produktów</Link>
      <h1>Koszyk</h1>
      {Array.isArray(value) ? (
        value.map((el, i) => {
          return (
            <CartItem
              key={i}
              cartItemInfo={el}
              adjustAmount={handleAdjustAmount}
              deleteCartItem={handleDeleteCartItem}
            ></CartItem>
          );
        })
      ) : (
        <></>
      )}
      <h2 className="sum">Razem: {sum}</h2>
      <button>
        <Link to="/order-summary">Przejdź do podsumowania</Link>
      </button>
    </>
  );
}
