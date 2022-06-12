import React, { useState } from 'react';
import { Offcanvas, ListGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPurchases } from '../store/slices/purchases.slice';
import { getCart } from '../store/slices/cart.slice';


const SideBar = ({ show, handleClose }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectProduct = (purchase) => {
        handleClose();
        navigate(`/products/${purchase.id}`)
    }


    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchases());
        dispatch(getCart())

    }, [dispatch])


    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        {
                            purchases.map(purchase => (
                                <ListGroup.Item key={purchase.id}>{purchase.cart.products.map(product => (
                                    <ListGroup.Item onClick={() => selectProduct(product)}>{product.title}
                                        <p>Quantity: {product.productsInCart.quantity}</p></ListGroup.Item>
                                ))}</ListGroup.Item>

                            ))
                        }

                    </ListGroup>



                </Offcanvas.Body>
                <Button>Check out</Button>
            </Offcanvas>

        </div>
    );
};

export default SideBar;