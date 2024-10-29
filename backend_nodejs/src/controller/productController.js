import productService from '../services/productService'

let getProduct = async(req,res) =>{
    let id = req.query.id; //ALL || id
    try {
        if(id){
            let info = await productService.getProduct(id);
            return res.status(200).json(info);
        }
        else{
            return res.status(200).json({
                errCode: -2,
                message:'Error from server!'
            })
        }
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let editProduct = async(req,res) =>{
    try {
        let info = await productService.editProduct(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let deleteProduct = async(req,res) =>{
    try {
        let info = await productService.deleteProduct(req.body.id);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let createProduct = async(req,res) =>{
    try {
        let info = await productService.createProduct(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let getProductByType = async(req,res) =>{
    try {
        let info = await productService.getProductByType(req.query.typeId);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let getProductById = async(req,res) =>{
    try {
        let info = await productService.getProductById(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let getNumberProductBySize = async(req,res) =>{
    try {
        let info = await productService.getNumberProductBySize(req.query.sizeId,req.query.productId);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}
module.exports ={
    getProduct: getProduct,
    editProduct:editProduct,
    deleteProduct:deleteProduct,
    createProduct:createProduct,
    getProductByType:getProductByType,
    getProductById:getProductById,
    getNumberProductBySize:getNumberProductBySize,
}