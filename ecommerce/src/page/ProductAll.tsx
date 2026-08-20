import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import type { Product } from "../component/ProductCard";
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [query] = useSearchParams();

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

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
        setCurrentPage(1);
      } catch {
        setError("We couldn't load the coffee beans. Please try again.");
      }
    };

    getProducts();
  }, [query]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentProducts = productList.slice(startIndex, endIndex);
  const totalPages = Math.ceil(productList.length / ITEMS_PER_PAGE);

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
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="product-pagination">
        <button type="button" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>
          Previous
        </button>

        <span>
          {currentPage} / {totalPages}
        </span>

        <button type="button" disabled={currentPage === totalPages} onClick={() => setCurrentPage((page) => page + 1)}>
          Next
        </button>
      </div>
    </main>
  );
};

export default ProductAll;
