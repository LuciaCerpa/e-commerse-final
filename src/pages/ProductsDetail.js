import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { filterCategory } from '../store/slices/product.slice';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { addToCart } from '../store/slices/purchases.slice'



const ProductsDetail = () => {

    const [products, setProducts] = useState({})
    const [quantity, setQuantity] = useState("")

    const navigate = useNavigate();
    const productsList = useSelector(state => state.products)
    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)

            .then(res => {
                const productSearched = res.data.data.products.find(product => product.id === Number(id));
                setProducts(productSearched);
                dispatch(filterCategory(productSearched?.category.id))
            });
    }, [id, dispatch]);

    const addPurchase = () => {

        const purchase = {
            id: id,
            quantity: quantity
        }
        dispatch(addToCart(purchase));

    }

    return (
        <div>
            <Row className='productDetailContainer'>
                <Col>
                    <h2>{products?.title}</h2>
                    <img src={products?.productImgs?.[0]} alt="" />
                    <input
                        type="number"
                        placeholder='quantity'
                        onChange={e => setQuantity(e.target.value)}
                        value={quantity}
                    />
                    <Button onClick={addPurchase} className="productDetailButton">Add to Cart</Button>
                    <p>{products.description}</p>
                </Col>                
                <Col lg={3} >
                    <ListGroup variant="flush" className='relatedProducts'>
                        <h3>Related products</h3>
                        {
                            productsList.map(product => (

                                <li onClick={() => navigate(`/products/${product.id}`)} key={product.id} >{product.title}

                                </li>
                            ))
                        }
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
};

export default ProductsDetail;