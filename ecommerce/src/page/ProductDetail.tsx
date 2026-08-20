import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import type { Product } from "../component/ProductCard";
import "./ProductDetail.css";

type ProductData = {
  products: Product[];
};

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const response = await fetch("/db.json");

        if (!response.ok) {
          throw new Error("Failed to load product");
        }

        const data: ProductData = await response.json();
        const selectedProduct = data.products.find((item) => item.id === Number(id));

        if (!selectedProduct) {
          setError("We couldn't find this coffee.");
          return;
        }

        setProduct(selectedProduct);
      } catch {
        setError("We couldn't load this coffee. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProductDetail();
  }, [id]);

  const createCartItem = (): CartItem | undefined => {
    if (!product) return undefined;

    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    };
  };

  const handleAddToCart = () => {
    const item = createCartItem();
    if (!item || !product) return;

    try {
      const storedCart = JSON.parse(localStorage.getItem("coffeeCart") ?? "[]");
      const cart: CartItem[] = Array.isArray(storedCart) ? storedCart : [];
      const existingItem = cart.find((cartItem) => cartItem.productId === item.productId);

      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, product.stock);
      } else {
        cart.push(item);
      }

      localStorage.setItem("coffeeCart", JSON.stringify(cart));
      setNotice(`${quantity} ${quantity === 1 ? "bag" : "bags"} added to your cart.`);
    } catch {
      setNotice("Your cart could not be updated.");
    }
  };

  const handleOrderNow = () => {
    const item = createCartItem();
    if (!item) return;

    sessionStorage.setItem("pendingOrder", JSON.stringify(item));
    setNotice("Your selection is ready. Connect a checkout page to complete the order.");
  };

  if (loading) {
    return <p className="detail-message">Loading coffee...</p>;
  }

  if (error || !product) {
    return <p className="detail-message">{error}</p>;
  }

  return (
    <main className="detail-page">
      <Container>
        <Row className="detail-layout">
          <Col lg={6}>
            <div className="detail-image-wrap">
              <img src={product.image} alt={product.name} />
              {product.featured && <span className="detail-badge">Featured roast</span>}
            </div>
          </Col>

          <Col lg={6} className="detail-content">
            <p className="detail-origin">{product.origin}</p>
            <h1>{product.name}</h1>
            <p className="detail-price">${product.price.toFixed(2)}</p>
            <p className="detail-description">{product.description}</p>

            <div className="detail-notes">
              {product.tastingNotes.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </div>

            <dl className="detail-facts">
              <div>
                <dt>Roast</dt>
                <dd>{product.roast}</dd>
              </div>
              <div>
                <dt>Process</dt>
                <dd>{product.process}</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>{product.weight}</dd>
              </div>
            </dl>

            <div className="quantity-row">
              <div>
                <p>Quantity</p>
                <small>{product.stock} bags available</small>
              </div>
              <div className="quantity-selector">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  disabled={quantity === 1}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
                  disabled={quantity === product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <p className="detail-total">
              Total <strong>${(product.price * quantity).toFixed(2)}</strong>
            </p>

            <div className="detail-actions">
              <button className="cart-action" type="button" onClick={handleAddToCart}>
                <FontAwesomeIcon icon={faCartShopping} />
                Add to Cart
              </button>
              <button className="order-action" type="button" onClick={handleOrderNow}>
                Order Now
              </button>
            </div>

            {notice && <p className="detail-notice">{notice}</p>}
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ProductDetail;
