import { raw } from "body-parser";
import db from "../models/index"
import bcrypt from 'bcryptjs'
import emailService from "./emailService";
import { where } from "sequelize";

let createNewOrder = (data) => {
    return new Promise(async(resolve,reject) =>{
        try {
            if(!data.data || !data.userId || !data.totalPrice || !data.paymentMethod){
                resolve({
                    errCode : 1,
                    message: 'Error...Missing parameters'
                })
            }  
            else{
                let order = await db.Order.bulkCreate(data.data);
                let bill = await db.Bill.create({
                        orderId : data.orderId,
                        userId : data.userId,
                        totalPrice : data.totalPrice,
                        note: data.note,
                        paymentMethod : data.paymentMethod,
                        statusId:data.statusId,
                })
                data.data.map(async(item) =>{
                    let product = await db.Product.findOne({ where: { id: item.productId } });
    
                    if (product) {
                        await db.Product.update({
                            number: product.number - item.count,
                        }, { where: { id: item.productId } });
                    }
                })
                resolve({
                    errCode:0,
                    message:'Create order successfully!'
                })
            }  
             resolve({
                errCode: 0,
                message: 'Create a new user successfull'
             })
        }catch (error) {
            reject(error);
        }
    })
}

let getBillAndOrder = (userId) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!userId){
                resolve({
                    errCode:1,
                    message:'Get bill failed...missing parameter'
                })
            }
            else{
                let bill =[];
                if(userId === 'ALL'){
                    bill = await db.Bill.findAll({
                        include:[
                            {
                                    model: db.User, as: 'userDataBill', attributes:['fullName','address','phonenumber','email']
                            },
                            {
                                model: db.Status, as: 'statusData', attributes:['valueStatus'],
                                // include:[
                                //     // {model: db.User, as: 'userData', attributes:['fullName','address','phonenumber','email']},
                                //     {model: db.Product, as: 'productData', attributes:['productId','nameProduct'],}
                                // ]
                            },
                        ],
                        raw: true,
                        nest:true,
                    })
                }
                else{
                    bill = await db.Bill.findAll({
                        where: {userId : userId},
                        include:[
                            {
                                    model: db.User, as: 'userDataBill', attributes:['fullName','address','phonenumber','email']
                            },
                            {
                                model: db.Status, as: 'statusData', attributes:['valueStatus'],
                            },
                        ],
                        raw: true,
                        nest:true,
                    })
                }
                 
                resolve({
                errCode: 0,
                data:bill,
                message:'Succesfull'
                })
            }
           
        }catch (error) {
            reject(error);
        }
    })
}

let getProductByOrder = (id) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!id){
                resolve({
                    errCode:1,
                    message:'Failed to get data....missing parameter'
                })
            }
            else{
                let product = await db.Order.findAll({
                    where: { orderId : id},
                    include:[
                        {
                            model: db.Product, as: 'productData', attributes:['id','productId','nameProduct','number','img'],
                            include:[
                                {model: db.Price, as: 'priceData', attributes:['valuePrice']},
                            ],
                            nest:true,
                        }
                    ],
                    raw:true,
                    nest:true,
                })
                if(product){
                    product.map((item) =>{
                        item.productData.img = Buffer.from(item.productData.img,'base64').toString('binary');
                    })
                }
                resolve({
                    errCode: 0,
                    data:product,
                    message:'Succesfull'
                 })
            }
             
        }catch (error) {
            reject(error);
        }
    })
}

let getProductByUserId = (id) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!id){
                resolve({
                    errCode:1,
                    message:'Failed to get data....missing parameter'
                })
            }
            else{
                let product = await db.Order.findAll({
                    where: { userId : id},
                    raw: true,
                    include:[
                        {model: db.Product, as: 'productData', attributes:['productId','nameProduct','img'],
                            include:[
                                {model: db.Price, as: 'priceData', attributes:['valuePrice']},
                            ],
                        }
                    ]
                })
                // if(product){
                //     product.map((item) =>{
                //         item.productData.img = Buffer.from(item.productData.img,'base64').toString('binary');
                //     })
                // }
                resolve({
                    errCode: 0,
                    data:product,
                    message:'Succesfull'
                 })
            }
             
        }catch (error) {
            reject(error);
        }
    })
}

let updateStatusBill = (data) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!data.id || !data.statusId){
                resolve({
                    errCode:1,
                    message:'Failed to update status....missing parameter'
                })
            }
            else{
                if(data.statusId === 'c'){
                    if(!data.data){
                        resolve({
                            errCode :2,
                            message:'Cannot update quantity of products',
                        })
                        return;
                    }
                    data.data.map(async(item) =>{
                        let product = await db.Product.findOne({ where: { id: item.productData.id } });
                        if (product) {
                            await db.Product.update({
                                number: product.number + item.count,
                            }, { where: { id: item.productData.id } });
                        }
                    })
                }
                await db.Bill.update(
                    {statusId : data.statusId},
                    {where: {id: data.id}}
                )
                resolve({
                    errCode: 0,
                    message:'Update status bill successfully!',
                 })
            }
             
        }catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createNewOrder:createNewOrder,
    getBillAndOrder:getBillAndOrder,
    getProductByOrder:getProductByOrder,
    getProductByUserId:getProductByUserId,
    updateStatusBill:updateStatusBill,
}