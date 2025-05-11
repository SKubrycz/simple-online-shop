import { useEffect, useState } from "react";
import type { CartProduct, Sign } from "../types/products";
import { getPartialSum } from "../utils/getPartialSum";

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

  const { id, name, price, amount } = cartItemInfo;

  function handlePartialSum() {
    let sum = getPartialSum(price.main, price.fractional, amount);
    setPartialSum(sum);
  }

  useEffect(() => {
    handlePartialSum();
  }, [amount]);

  return (
    <div className="grid">
      <h3>{name}</h3>
      <div className="flex-center">
        <button disabled={amount < 2} onClick={() => adjustAmount("-", id)}>
          -
        </button>
        <h4>x{amount}</h4>
        <button disabled={amount >= 99} onClick={() => adjustAmount("+", id)}>
          +
        </button>
      </div>
      <h4>
        {price.main}.{price.fractional} | Suma: {partialSum.toFixed(2)}
      </h4>
      <button onClick={() => deleteCartItem(id)} className="btn-red">
        Usuń
      </button>
    </div>
  );
}
