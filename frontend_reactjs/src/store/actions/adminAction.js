import actionTypes from './actionTypes';
import { getProduct , getAllBillService} from '../../services/userService';
import { toast } from 'react-toastify';
// import { types } from 'node-sass';


export const getAllProduct = () => {
    return async(dispatch, getState) =>{
        try {
            let res = await getProduct('ALL');
            if(res && res.errCode === 0){
                dispatch(getProductSuccess(res.data));
            }
            else{
                toast.error("Error from server !");
            }
        } catch (error) {
            toast.error("Error from server !");
            dispatch(getProductFailed());
            console.log("Error from server: ",error);
        }
    }
}


export const getAllBill = (userId) => {
    return async(dispatch, getState) =>{
        try {
            let res = await getAllBillService(userId);
            if(res && res.errCode === 0){
                dispatch(getBillSuccess(res.data));
            }
            else{
                toast.error("Error from server !");
                dispatch(getBillFailed());
            }
        } catch (error) {
            toast.error("Error from server !");
            dispatch(getBillFailed());
            console.log("Error from server: ",error);
        }
    }
}

export const getBillSuccess = (data) => ({
    type: actionTypes.GET_BILL_SUCCESS,
    data:data,
})

export const getBillFailed = () => ({
    type: actionTypes.GET_BILL_FAILED,
})

export const getProductSuccess = (data) => ({
    type: actionTypes.GET_PRODUCT_SUCCESS,
    data:data,
})

export const getProductFailed = () => ({
    type: actionTypes.GET_PRODUCT_FAILED,
})

export const increaseItem = (item) => ({
    type: actionTypes.INCREASE_ITEM_WHITELIST,
    data:item,
})

export const decreaseItem = (item) => ({
    type: actionTypes.DECREASE_ITEM_WHITELIST,
    data:item,
})

export const increaseItemCart = (item) => ({
    type: actionTypes.INCREASE_ITEM_CARTLIST,
    data:item,
})

export const decreaseItemCart = (item) => ({
    type: actionTypes.DECREASE_ITEM_CARTLIST,
    data:item,
})