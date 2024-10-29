import { stringify } from "react-auth-wrapper/helpers";
import axios from "../axios"

const handleLoginApi = (userEmail,userPassword) =>{
    return axios.post('/api/login', {
        email:userEmail,
        password: userPassword
    } );
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) =>{
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) =>{
    return axios.delete('/api/delete-user', 
        {
            data: {
                id: userId,
            }
        }
    )
}

const editUserService = (data) =>{
    return axios.put('/api/edit-user', data);
}

const getAllService = (id) =>{
    return axios.get(`/api/get-all-service?id=${id}`);
}

const handleSaveChangePassword  = (data) =>{
    return axios.put('/api/change-password', data);
}

const getAllImg = () => {
    return axios.get('/api/get-all-img')
}

const createNewImg = (data) =>{
    return axios.post('/api/create-new-img', data)
}

const sendEmail = (data) =>{
    return axios.post('/api/send-email', data)
}

const forgotPassword = (data) =>{
    return axios.post('/api/forgot-password', data)
}

const sendCapcha = (data) =>{
    return axios.post('/api/send-capcha', data)
}


const editImg = (data) => {
    return axios.put('/api/edit-img',data)
}

const deleteImg= (id) =>{
    return axios.delete('/api/delete-img', 
        {
            data: {
                id: id,
            }
        }
    )
}

const editProduct = (data) => {
    return axios.put('/api/edit-product',data)
}

const deleteProduct= (id) =>{
    return axios.delete('/api/delete-product', 
        {
            data: {
                id: id,
            }
        }
    )
}

const getProduct = (id) => {
    return axios.get(`/api/get-product?id=${id}`);
}

const getProductByType = (typeId) => {
    return axios.get(`/api/get-product-by-type?typeId=${typeId}`);
}


const getProductById = (id) => {
    return axios.get(`/api/get-product-by-id?id=${id}`);
}

const getProductByOrder = (id) => {
    return axios.get(`/api/get-product-by-order?id=${id}`);
}

const getProductByUserId = (id) => {
    return axios.get(`/api/get-order-by-user?id=${id}`);
}

const getAllBillService = (userId) => {
    return axios.get(`/api/get-bill-order?userId=${userId}`);
}

const createProduct = (data) =>{
    return axios.post('/api/create-product', data)
}

const getNumberProductBySize = (sizeId,productId) =>{
    return axios.get(`/api/get-product-number-by-size?sizeId=${sizeId}&productId=${productId}`);
}

const createOrder = (data) =>{
    return axios.post('/api/create-order', data)
}

const deleteOrder = (id) =>{
    return axios.delete('/api/delete-order', {
        data: {
            id: id,
        }
    })
}


const updateStatusBill = (data) => {
    return axios.put('/api/edit-status-bill',data)
}
export {handleLoginApi , getAllUsers , createNewUserService ,deleteUserService,
    editUserService, getAllService, handleSaveChangePassword , getAllImg , createNewImg,
    editImg, deleteImg,sendEmail,sendCapcha,forgotPassword,editProduct,deleteProduct,
    getProduct,createProduct,getProductByType,getProductById,getNumberProductBySize,
    createOrder,deleteOrder,getProductByOrder,getAllBillService,getProductByUserId,
    updateStatusBill,
};