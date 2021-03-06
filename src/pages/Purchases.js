import React from 'react';
import { useEffect } from 'react';
import { getPurchases } from '../store/slices/purchases.slice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PurchaseDate } from '../components'


const Purchases = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchases());
    }, [dispatch])

    return (
        <div>

            <ul className='purchasesContainer'>
                <div>
                    <h1 style={{ marginTop: "5rem" }}>Purchases</h1>
                </div>
                {
                    purchases.map(purchase => (
                        <li className='purchaseDate'><PurchaseDate purchase={purchase} />
                            {purchase.cart.products.map(product => (
                                <ul>
                                    <li onClick={() => navigate(`/products/${product.id}`)}>
                                        <div>
                                            <p>{product.brand}</p>
                                            <h4>{product.title}</h4>
                                            <div className='purchaseDateBottom'>
                                                <h5>Quantity:</h5>
                                                <h6>{product.productsInCart.quantity}</h6>
                                            </div>                               </div>

                                    </li>
                                </ul>))}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;