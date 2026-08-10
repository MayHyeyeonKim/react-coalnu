import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({item}) => {
    const navigate = useNavigate();
    const ShowDetail = () => {
        navigate(`/product/${item.id}`)
    }
    return (
    <div className="product-card" onClick={ShowDetail}>
        <img className="item-img" src={item?.img} alt="item-img"/>
        <div>{item?.choice === true ? "Consious choice" : ""}</div>
        <div>{item?.title}</div>
        <div>₩ {item?.price}</div>
        <div> {item?.new === true? "new" : ""} </div>
        
    </div>
    )
}

export default ProductCard;