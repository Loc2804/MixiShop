import slideService from '../services/slideService'

let createNewImg = async(req,res) =>{
    try {
        let info = await slideService.createNewImg(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let editImg = async(req,res) =>{
    try {
        let info = await slideService.editImg(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let deleteImg = async(req,res) =>{
    try {
        let info = await slideService.deleteImg(req.body.id);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

let getAllImg = async(req,res) =>{
    try {
        let info = await slideService.getAllImg();
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            message:'Error from server!'
        })
    }
}

module.exports = {
    createNewImg: createNewImg,
    editImg:editImg,
    deleteImg:deleteImg,
    getAllImg:getAllImg
}