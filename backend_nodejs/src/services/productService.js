import { raw } from "body-parser";
import db from "../models/index"
import { Buffer } from 'buffer';
import { includes } from "lodash";
import { where } from "sequelize";

let createProduct = (data) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!data.nameProduct || !data.img || !data.productId 
                || !data.detailHTML  || !data.detailMarkdown || !data.number 
                || !data.typeId || !data.priceId || !data.sizeId 
            ){
                resolve({
                    errCode : 1,
                    message:'Missing parameters'
                })
            }
            else{
                await db.Product.create({
                    productId:data.productId,
                    nameProduct:data.nameProduct,
                    detailHTML:data.detailHTML,
                    detailMarkdown:data.detailMarkdown,
                    number:data.number,
                    typeId:data.typeId,
                    priceId:data.priceId,
                    sizeId:data.sizeId,
                    discount:data.discount,
                    img:data.img ,
                    isLove:data.isLove,
                })
                resolve({
                    errCode: 0,
                    message:'Create product success!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getProduct = (id) =>{
    return new Promise(async(resolve,reject) => {
        try {
            let product = null;
            if(id === 'ALL')
            {
                product = await db.Product.findAll({
                    include:[
                        {model: db.Size, as: 'sizeData', attributes:['valueSize']},
                        {model: db.Type, as: 'typeData', attributes:['valueType']},
                        {model: db.Price, as: 'priceData', attributes:['valuePrice']},
                    ],
                    raw: true,
                    nest:true,
                });
            }
            if(id && id !== 'ALL'){
                product = await db.Product.findOne({
                    where: {id: id},
                    raw: true,
                });
            }
            if(product && product.length > 0){
                product.map((item) =>{
                    item.img = Buffer.from(item.img,'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode:0,
                data:product,
            });
        } catch (error) {
            reject(error);
        }
    })
}

let getProductByType = (typeId) =>{
    return new Promise(async(resolve,reject) => {
        try {
            let product = await db.Product.findAll({
                where: {typeId : typeId},
                include:[
                    {model: db.Size, as: 'sizeData', attributes:['valueSize']},
                    {model: db.Type, as: 'typeData', attributes:['valueType']},
                    {model: db.Price, as: 'priceData', attributes:['valuePrice']},
                ],
                raw: true,
                nest:true,
            });
            if(product && product.length > 0){
                product.map((item) =>{
                    item.img = Buffer.from(item.img,'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode:0,
                data:product,
            });
        } catch (error) {
            reject(error);
        }
    })
}

let getProductById = (id) =>{
    return new Promise(async(resolve,reject) => {
        try {
            let product = await db.Product.findOne({
                where: {id: id},
                include:[
                    {model: db.Size, as: 'sizeData', attributes:['valueSize']},
                    {model: db.Type, as: 'typeData', attributes:['valueType']},
                    {model: db.Price, as: 'priceData', attributes:['valuePrice']},
                ],
                raw: true,
                nest:true,
            });
            if(product){
                    product.img = Buffer.from(product.img,'base64').toString('binary');
            }
            resolve({
                errCode:0,
                data:product,
            });
        } catch (error) {
            reject(error);
        }
    })
}

let getNumberProductBySize = (sizeId,productId) =>{
    return new Promise(async(resolve,reject) => {
        try 
            {
                if(!productId || !sizeId){
                    resolve({
                        errCode : 1,
                        message:'Missing parameters'
                    })
                }
                else{
                    let product = await db.Product.findOne({
                        where: {
                            sizeId:sizeId,
                            productId:productId
                        },
                        include:[
                            {model: db.Size, as: 'sizeData', attributes:['valueSize']},
                            {model: db.Type, as: 'typeData', attributes:['valueType']},
                            {model: db.Price, as: 'priceData', attributes:['valuePrice']},
                        ],
                        raw: true,
                        nest:true,
                    });
                    if(product){
                        product.img = Buffer.from(product.img,'base64').toString('binary');
                        resolve({
                            errCode:0,
                            data:product,
                        });
                    }
                    else{
                        resolve({
                            errCode: 2,
                            data: {},
                        })
                    }
                }
    } catch (error) {
        reject(error);
    }
        
    })
}

let editProduct = (data) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!data.id || !data.nameProduct || !data.img || !data.productId 
                || !data.detailHTML  || !data.detailMarkdown || !data.number 
                || !data.typeId || !data.priceId || !data.sizeId 
            ){
                resolve({
                    errCode : 1,
                    message:'Missing parameters'
                })
            }
            else{
                let product = await db.Product.findOne({
                    where: {id : data.id},
                    raw: false,
                })
                if(product){
                    // product.productId=data.productId;
                    // product.nameProduct=data.nameProduct;
                    // product.detailHTML=data.detailHTML;
                    // product.detailMarkdown=data.detailMarkdown;
                    // product.number=data.number;
                    // product.typeId=data.typeId;
                    // product.priceId=data.priceId;
                    // product.sizeId=data.sizeId;
                    // product.discount=data.discount;
                    // product.img=data.img ;
                    // product.isLove=data.isLove;
                    // product.save();
                    try {
                        await db.Product.update(
                            { productId:data.productId,
                                nameProduct:data.nameProduct,
                                detailHTML:data.detailHTML,
                                detailMarkdown:data.detailMarkdown,
                                number:data.number,
                                typeId:data.typeId,
                                priceId:data.priceId,
                                sizeId:data.sizeId,
                                discount:data.discount,
                                img:data.img ,
                                isLove:data.isLove,
                            }, 
                            { where: {id : data.id} }
                        );
                    } catch (error) {
                        reject({
                            error
                        });
                    }
                    resolve({
                        errCode: 0,
                        message:'Edit product success!'
                    })
                }
                else{
                    resolve({
                        errCode: 2,
                        message:'Edit product failed!'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteProduct = (id) =>{
    return new Promise(async(resolve,reject) =>{
        try {
            if(!id){
                resolve({
                    errCode : 1,
                    message:'Missing parameters'
                })
            }
            else{
                let product = await db.Product.findOne({
                    where: {id: id}
                })
                if(!product)
                {
                    resolve({
                        errCode:2,
                        message:'The product is not existed.'
                    })
                    return;
                }
                //product.destroy() -> xóa nhưng user phải là 1 instance của sequelize -> kéo db lên nodejs và xóa
                await db.Product.destroy({ //dùng hàm như này -> hạn chế lỗi raw -> đi thẳng vào db và xóa
                    where: {id:id} 
                })
                resolve({
                    errCode:0,
                    message:'Delete product success!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports ={
    createProduct,
    getProduct,
    editProduct,
    deleteProduct,
    getProductByType,
    getProductById,
    getNumberProductBySize,
}