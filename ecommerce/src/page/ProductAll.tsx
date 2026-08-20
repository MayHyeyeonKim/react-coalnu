import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import type { Product } from "../component/ProductCard";
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [query] = useSearchParams();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const searchQuery = query.get("search") || "";

        const response = await fetch("/db.json");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data: { products: Product[] } = await response.json();

        const filteredProducts = data.products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
        );

        setProductList(filteredProducts);
      } catch {
        setError("We couldn't load the coffee beans. Please try again.");
      }
    };

    getProducts();
  }, [query]);

  if (error) {
    return <p className="product-message">{error}</p>;
  }

  return (
    <main className="product-page">
      <div className="product-heading">
        <p>Freshly roasted</p>
        <h1>Shop Coffee</h1>
      </div>

      <div className="product-grid">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductAll;
