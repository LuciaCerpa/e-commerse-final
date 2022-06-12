import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';



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
        .then(res => {
            const purchasesSorted = res.data.data.purchases.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            dispatch(setPurchases(purchasesSorted))
        })
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
            alert("An error has ocurred!")
            alert("Make sure you are logged in")            
        })
        .finally(() => dispatch(setIsLoading(false)));
}


export default purchasesSlice.reducer;
