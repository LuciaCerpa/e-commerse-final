import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { getPurchases } from './purchases.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload;
    }
}
})

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
    .then(res => {            
        dispatch(setCart(res.data.data.cart.products))
        dispatch(getPurchases())
    })
    .finally(() => dispatch(setIsLoading(false)));
}

export default cartSlice.reducer;
