import { Link } from "react-router-dom";

export type Product = {
  id: number;
  name: string;
  origin: string;
  roast: string;
  process: string;
  tastingNotes: string[];
  price: number;
  weight: string;
  stock: number;
  featured: boolean;
  image: string;
  description: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link className="product-card" to={`/product/${product.id}`}>
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />
        {product.featured && <span className="product-badge">Featured</span>}
      </div>

      <div className="product-card-content">
        <p className="product-origin">{product.origin}</p>
        <h2>{product.name}</h2>
        <p className="product-notes">{product.tastingNotes.join(" · ")}</p>
        <div className="product-card-footer">
          <span>${product.price.toFixed(2)}</span>
          <small>{product.weight}</small>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
