import { useEffect, useState } from "react";
import type { CartProduct } from "../types/products";
import { getPartialSum } from "../utils/getPartialSum";

interface SummaryItemProps {
  cartItemInfo: CartProduct;
}

export default function SummaryItem({ cartItemInfo }: SummaryItemProps) {
  const [partialSum, setPartialSum] = useState(0);

  const { name, amount, price } = cartItemInfo;

  function handlePartialSum() {
    const sum = getPartialSum(price.main, price.fractional, amount);
    setPartialSum(sum);
  }

  useEffect(() => {
    handlePartialSum();
  }, []);

  return (
    <div className="grid">
      <h4>{name}</h4>
      <h5>x{amount}</h5>
      <h5>
        {price.main}.{price.fractional} | {partialSum.toFixed(2)}
      </h5>
    </div>
  );
}
