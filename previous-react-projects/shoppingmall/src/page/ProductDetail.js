import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Dropdown, Button } from "react-bootstrap";

const ProductDetail = () => {;
    const [product, setProduct] = useState(null);
    console.log("product는? ", product)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    let { id } = useParams()
    
    const getProductDetail = async () => {
        const url = `https://my-json-server.typicode.com/mayhyeyeonkim/react-coalnu/products/${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductDetail();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Container className="product-container">
            <Row>
                <Col xs={12} md={6} className="product-detail-img">
                    {product && <img src={product.img} alt={product.title} />}
                </Col>
                <Col xs={12} md={6}>
                    <div>{product?.title}</div>
                    <div>{product?.price}</div>
                    <div className="choice">
                        {product?.choice ? "Conscious choice" : ""}
                    </div>
                    <Dropdown className="drop-down">
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                            Select Size
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product?.size && product.size.length > 0 ? (
                                product.size.map((item, index) => (
                                    <Dropdown.Item key={index} href="#/action-1">
                                        {item}
                                    </Dropdown.Item>
                                ))
                            ) : (
                                <Dropdown.Item disabled>No sizes available</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant="dark" className="add-button">
                        Add to cart
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
