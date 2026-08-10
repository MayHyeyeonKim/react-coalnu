import React, { useState } from "react";
import {Row, Col, Button, Form }from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const SearchBox = () =>{
    let [keyword, setKeyword] = useState("");
    let dispatch = useDispatch();
    let { contact } = useSelector((state)=>state);
    const searchByName = (event)=>{
        event.preventDefault();
        dispatch({type:"SEARCH_BY_USERNAME", payload: { keyword }})
    }
    return (
        <Form onSubmit={searchByName} className="search-form">
            <Row>
                <Col lg={10}>        
                <Form.Control type="text" placeholder="name" onChange={(event)=>setKeyword(event.target.value)} />
                </Col>

                <Col lg={2}>
                <Button type="submit">Search</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default SearchBox