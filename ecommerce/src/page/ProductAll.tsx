import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import type { Product } from "../component/ProductCard";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const ProductAll = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [query] = useSearchParams();
  const searchQuery = query.get("search")?.trim() || "";

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");

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
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [searchQuery]);

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

      {loading ? (
        <p className="product-message">Loading coffee...</p>
      ) : productList.length === 0 ? (
        <div className="empty-products">
          <div className="empty-search-visual">
            <span className="empty-bean empty-bean-one" />
            <span className="empty-bean empty-bean-two" />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>

          <p className="empty-eyebrow">Search came up empty</p>
          <h2>No coffee found</h2>
          {searchQuery ? (
            <p className="empty-copy">
              We couldn't find a coffee matching <strong>“{searchQuery}”</strong>.
              <br />
              Try a different name or explore one of these origins.
            </p>
          ) : (
            <p className="empty-copy">There are no coffees available right now. Please check back soon.</p>
          )}

          {searchQuery && (
            <div className="empty-suggestions">
              <span>Try:</span>
              <Link to="/?search=Ethiopia">Ethiopia</Link>
              <Link to="/?search=Colombia">Colombia</Link>
              <Link to="/?search=Brazil">Brazil</Link>
            </div>
          )}

          <Link className="empty-reset" to="/">
            View all coffee <span>→</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="product-grid">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="product-pagination">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                Previous
              </button>

              <span>
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default ProductAll;
