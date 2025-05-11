import { useEffect, useState } from "react";
import type { CartProduct, Sign } from "../types/products";

interface CartItemProps {
  cartItemInfo: CartProduct;
  adjustAmount: (sign: Sign, id: number) => void;
  deleteCartItem: (id: number) => void;
}

export default function CartItem({
  cartItemInfo,
  adjustAmount,
  deleteCartItem,
}: CartItemProps) {
  const [partialSum, setPartialSum] = useState(0);

  function handlePartialSum() {
    const main = cartItemInfo.price.main;
    const fractional = cartItemInfo.price.fractional / 100;
    let sum =
      main * cartItemInfo.amount + fractional * cartItemInfo.price.fractional;

    setPartialSum(sum);
  }

  useEffect(() => {
    handlePartialSum();
  }, [cartItemInfo.amount]);

  return (
    <div className="flex">
      <h3>{cartItemInfo.name}</h3>
      <div className="flex">
        <button onClick={() => adjustAmount("-", cartItemInfo.id)}>-</button>
        <h4>x{cartItemInfo.amount}</h4>
        <button onClick={() => adjustAmount("+", cartItemInfo.id)}>+</button>
      </div>
      <h4>
        {cartItemInfo.price.main}.{cartItemInfo.price.fractional} | Suma:{" "}
        {partialSum}
      </h4>
      <button onClick={() => deleteCartItem(cartItemInfo.id)}>Usuń</button>
    </div>
  );
}
