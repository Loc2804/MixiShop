import { raw } from "body-parser";
import db from "../models/index"
import { Buffer } from 'buffer';
let createNewImg = (data) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!data.name || !data.img){
                resolve({
                    errCode : 1,
                    message:'Missing parameters'
                })
            }
            else{
                await db.Slide.create({
                    nameImg: data.name,
                    slideImg: data.img,
                })
                resolve({
                    errCode: 0,
                    message:'Create slide img success!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllImg = () =>{
    return new Promise(async(resolve,reject) =>{
        try {
            let slide = await db.Slide.findAll();
            if(slide && slide.length > 0){
                slide.map((item) =>{
                    item.slideImg = Buffer.from(item.slideImg,'base64').toString('binary');
                    return item;
                }) 
            }
            resolve({
                errCode: 0,
                data: slide,
            })
            
        } catch (error) {
            reject(error)
        }
    })
}

let editImg = (data) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!data.name || !data.img){
                resolve({
                    errCode : 1,
                    message:'Missing parameters'
                })
            }
            else{
                let img = await db.Slide.findOne({
                    where: {id : data.id},
                    raw: false,
                })
                if(img){
                    img.nameImg = data.name;
                    img.slideImg = data.img;
                    img.save();
                    resolve({
                        errCode: 0,
                        message:'Edit slide img success!'
                    })
                }
                else{
                    resolve({
                        errCode: 2,
                        message:'Edit slide img failed!'
                    })
                }
                
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteImg = (id) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!id){
                resolve({
                    errCode : 1,
                    message:'Missing parameters'
                })
            }
            else{
                let img = await db.Slide.findOne({
                    where: {id: id}
                })
                if(!img)
                {
                    resolve({
                        errCode:2,
                        message:'The img is not existed.'
                    })
                    return;
                }
                //img.destroy() -> xóa nhưng user phải là 1 instance của sequelize -> kéo db lên nodejs và xóa
                await db.Slide.destroy({ //dùng hàm như này -> hạn chế lỗi raw -> đi thẳng vào db và xóa
                    where: {id:id} 
                })
                resolve({
                    errCode:0,
                    message:'Delete slide img success!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewImg:createNewImg,
    getAllImg:getAllImg,
    editImg:editImg,
    deleteImg : deleteImg,
}