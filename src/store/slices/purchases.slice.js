import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import redux from 'redux'

export const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            return action.payload;
        }        
    }    
})

export const { setPurchases } = purchasesSlice.actions;

export const getPurchases = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
        .then(res => dispatch(setPurchases(res.data.data.purchases)))
        .finally(() => dispatch(setIsLoading(false)));        
}

export const addToCart = (purchase) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', purchase, getConfig())
        .then(() => {
            dispatch(getPurchases())
            alert("added product")
        })
        .catch(error => {
            console.log(error)
            alert("An Error has occured")
        })
        .finally(() => dispatch(setIsLoading(false)));
}


export default purchasesSlice.reducer;
