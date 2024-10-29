import billService from '../services/billService'

let createNewOrder = async(req,res) =>{
    try {
        let info = await billService.createNewOrder(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let cancelOrder = async(req,res) =>{
    try {
        let info = await billService.cancelOrder(req.body.id);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let createNewBill = async(req,res) =>{
    try {
        let info = await billService.createNewBill(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let getBillAndOrder = async(req,res)  =>{
    try {
        let info = await billService.getBillAndOrder(req.query.userId);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let getProductByOrder = async(req,res)  =>{
    try {
        let info = await billService.getProductByOrder(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let getProductByUserId = async(req,res)  =>{
    try {
        let info = await billService.getProductByUserId(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let updateStatusBill =  async(req,res)  =>{
    try {
        let info = await billService.updateStatusBill(req.body);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}
module.exports ={
    createNewOrder:createNewOrder,
    createNewBill :createNewBill ,
    cancelOrder:cancelOrder,
    getBillAndOrder:getBillAndOrder,
    getProductByOrder:getProductByOrder,
    getProductByUserId:getProductByUserId,
    updateStatusBill:updateStatusBill,
}