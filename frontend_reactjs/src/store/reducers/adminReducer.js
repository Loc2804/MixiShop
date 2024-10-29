import actionTypes from '../actions/actionTypes';

const initialState = {
    // isLoadingGender: false,
    // genders: [],
    itemWhiteList: 0,
    whiteList:[],
    cartList:[],
    listProduct:[],
    listBill:[],
}

const adminReducer = (state = initialState, action) => {
    let copyState = {...state};
    switch (action.type) {
        
        case actionTypes.INCREASE_ITEM_WHITELIST:
            copyState = {...state};
            copyState.itemWhiteList = copyState.itemWhiteList + 1;
            copyState.whiteList.push(action.data);
            return {
                ...copyState,
            }
        case actionTypes.DECREASE_ITEM_WHITELIST:
            copyState = {...state};
            if (copyState.itemWhiteList > 0) {
                copyState.itemWhiteList = copyState.itemWhiteList - 1;
                copyState.whiteList = copyState.whiteList.filter(item => item.id !== action.data.id);
            }
            return {
                ...copyState,
            }
        case actionTypes.GET_PRODUCT_SUCCESS:
            state.listProduct =action.data.map(newItem => {
                const existingItem = state.listProduct.find(item => item.id === newItem.id);
                return {
                    ...newItem,
                    showLove: existingItem ? existingItem.showLove : false // Giữ trạng thái cũ nếu có, ngược lại đặt mặc định là false
                };
            });
            return{
                ...state,
            }
        case actionTypes.GET_PRODUCT_FAILED:
            state.listProduct = [];
            return{
                ...state,
            }
        case actionTypes.GET_BILL_SUCCESS:
        state.listBill = action.data;
        return{
            ...state,
        }
        case actionTypes.GET_BILL_FAILED:
            state.listBill = []; 
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;