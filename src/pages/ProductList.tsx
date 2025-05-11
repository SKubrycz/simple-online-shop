import { useState } from "react";
import products from "../products.json";
import ProductItem from "../components/ProductItem";
import type { CartProduct, Product } from "../types/products";
import { Link } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";

export default function ProductList() {
  const [productList] = useState<Product[]>(products);
  const [value, setValue] = useLocalStorage("cart");

  function handleAddCart(id: number): void {
    let updatedValue: CartProduct[] | null = null;

    if (Array.isArray(value)) {
      const newValueArray = value.map((el: CartProduct, i: number) => {
        // If the cart already contains an item with specified 'id', add 1 to the 'amount' property
        if (el.id === id) {
          const updatedItem = {
            ...el,
            amount: el.amount ? el.amount + 1 : 1,
          };
          updatedValue = value;
          updatedValue[i] = updatedItem;
          return updatedItem;
        }
        return el;
      });

      if (updatedValue) {
        setValue(newValueArray);
      }
    }

    if (!updatedValue && Array.isArray(productList)) {
      // Search for an item with a specified 'id' from JSON file
      const found = productList.find((el: Product) => el.id === id);
      if (found) {
        // If the item with such 'id' exists, add an 'amount' property with initial value of 1
        // and adjust the localStorage accordingly
        const withAmount = {
          ...found,
          amount: 1,
        };
        setValue((previous: CartProduct[]) => [...previous, withAmount]);
      }
    }
  }

  return (
    <>
      <h1>Lista produktów</h1>
      <h4>
        <Link to="/shopping-cart">Przeglądaj koszyk</Link>
      </h4>
      <div className="flex-col">
        {Array.isArray(productList) &&
          productList.map((el, i) => {
            return (
              <ProductItem
                key={i}
                productInfo={el}
                addToCart={() => handleAddCart(el.id)}
              ></ProductItem>
            );
          })}
      </div>
    </>
  );
}
