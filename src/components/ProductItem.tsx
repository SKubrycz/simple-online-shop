import type { Product } from "../types/products";

interface ProductProps {
  productInfo: Product;
  addToCart: () => void;
}

export default function Product({ productInfo, addToCart }: ProductProps) {
  return (
    <div className="flex">
      <h4>{productInfo.name}</h4>
      <h5>
        {productInfo.price.main}.{productInfo.price.fractional}
      </h5>
      <button onClick={addToCart}>Dodaj do koszyka</button>
    </div>
  );
}
