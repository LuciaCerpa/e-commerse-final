import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterCategory, filterProductQuery, getProducts } from '../store/slices/product.slice';
import { useDispatch } from 'react-redux'
import { Card, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState([])
  const products = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getProducts());

    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
      .then(res => setCategories(res.data.data.categories))
  }, [dispatch])



  const filterProducts = () => {
    dispatch(filterProductQuery(search))
  }

  const selectCategory = (id) => {
    dispatch(filterCategory(id))
  }


  return (
    <div>
      <h1></h1>
      <Row className="g-4" >
        <h1 style={{ marginTop: "5rem" }}>Home</h1>
        <Col lg={3} className="mb-4 mt-5"  >
          <h4>Categories</h4>
          <ListGroup>
            {
              categories.map(category => (
                <ListGroup.Item style={{ cursor: 'pointer', border: "1px solid rgba(255, 255, 0, 0.5)", backgroundColor: "rgba(0, 0, 0, 0.3)" }} key={category.id} onClick={() => selectCategory(category.id)}>{category.name}</ListGroup.Item>
              ))
            }
          </ListGroup>
        </Col>
        <Col>
          <InputGroup className="mb-5 mt-5">
            <FormControl style={{ backgroundColor: "rgb(182, 190, 197)", borderTop: "none", borderRadius: "1rem" }}
              placeholder="Search product"
              onChange={e => setSearch(e.target.value)}
              value={search}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={filterProducts} style={{ marginLeft: "5px", color: "yellow", border: "none", zIndex: "-1" }}>
              Search
            </Button>
          </InputGroup>

          <Row xs={1} md={2} lg={3} className="g-4">
            {
              products.map(product => (
                <Col className='col' key={product.id}>
                  <Card style={{ cursor: 'pointer', border: "1px solid rgba(255, 255, 0, 0.5)", backgroundColor: "rgba(0, 0, 0, 0.7)" }} className='img' onClick={() => navigate(`/products/${product.id}`)} >
                    <img src={product.productImgs[0]} />
                    <Card.Body>
                      <Card.Title><h5>{product.title}</h5></Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;