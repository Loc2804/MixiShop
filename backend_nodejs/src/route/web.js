import express from "express"
import homeController from '../controller/homeController'
import userController from '../controller/userController'
import slideController  from '../controller/slideController'
import productController from '../controller/productController'
import billController from '../controller/billController'

let router = express.Router();

let initWebRoutes = (app) =>{
    router.get('/', homeController.getHomePage);

    //user
    router.get('/api/get-all-service', userController.getAllService);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/change-password', userController.handleChangePassword);
    router.post('/api/send-email', userController.sendEmail);
    router.post('/api/forgot-password', userController.handleFindPassword);
    //slide
    router.get('/api/get-all-img', slideController.getAllImg);
    router.post('/api/create-new-img', slideController.createNewImg);
    router.put('/api/edit-img', slideController.editImg);
    router.delete('/api/delete-img', slideController.deleteImg);

    //product
    router.get('/api/get-product', productController.getProduct);
    router.get('/api/get-product-by-type', productController.getProductByType);
    router.get('/api/get-product-by-id', productController.getProductById);
    router.post('/api/create-product', productController.createProduct);
    router.get('/api/get-product-number-by-size', productController.getNumberProductBySize);
    router.put('/api/edit-product', productController.editProduct);
    router.delete('/api/delete-product', productController.deleteProduct);
    
    //bill
    router.post('/api/create-order', billController.createNewOrder);
    router.get('/api/get-bill-order', billController.getBillAndOrder);
    router.get('/api/get-order-by-user', billController.getProductByUserId);
    router.get('/api/get-product-by-order', billController.getProductByOrder);
    router.delete('/api/delete-order', billController.cancelOrder);
    router.put('/api/edit-status-bill', billController.updateStatusBill);
    return app.use("/",router);
}

module.exports = initWebRoutes; 