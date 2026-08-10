import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
    const [productList, setProductList] = useState([]);
    const [query, setQuery] = useSearchParams();
    const getProducts = async()=>{
        const searchQuery = query.get("q") || ""
        const url = `https://my-json-server.typicode.com/mayhyeyeonkim/react-coalnu/products?q=${searchQuery}`;
        let response = await fetch(url)
        let data = await response.json();
        setProductList(data);
    }
    useEffect(()=>{
        getProducts();
    },[query])

    return <div>
        <Container>
            <Row>
                {productList.map((menu,index)=>(<Col key={index} md={3} sm={12}><ProductCard item={menu}/></Col>))}
            </Row>
        </Container>
        </div>;
};

export default ProductAll