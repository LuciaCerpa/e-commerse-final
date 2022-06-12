import React from 'react';
import { Offcanvas, ListGroup, Button, ListGroupItem } from 'react-bootstrap';
import { useSelector }  from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import getConfig from '../utils/getConfig';
import { getPurchases } from './../store/slices/purchases.slice';
import { getCart } from './../store/slices/cart.slice';
import { useDispatch } from 'react-redux';

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
        dispatch(getPurchases())
    }, [dispatch])
    console.log(purchases)

    // useEffect(()=>{
    //     axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
    //         .then(()=>{
    //             dispatch(setCart([]))
    //             dispatch(getPurchases())
    //         })
    // })
    
console.log(purchases)
console.log(purchases[0])
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
                                <ListGroup.Item>{purchase.cart.products.map(product=>(
                                    <ListGroup.Item onClick={()=>selectProduct(product)}>{product.title}
                                    <p>Quantity: {product.productsInCart.quantity}</p></ListGroup.Item>
                                ))}</ListGroup.Item>

                            ))
                        }
                    </ListGroup>

                        <Button onClick={()=>dispatch()}>Check out</Button>

                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default SideBar;