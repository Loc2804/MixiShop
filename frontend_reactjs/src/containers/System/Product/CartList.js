import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES,CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions";
import './CartList.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { createOrder} from '../../../services/userService';
import { Buffer } from 'buffer';
import NumberFormat from 'react-number-format';
import HomeFooter from '../../HomePage/HomeFooter';
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router-dom';
const { v4: uuidv4 } = require('uuid');

class CartList extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            cartList:[],
            isShowOrder:false,
            total:0,
            address:'',
            name:'',
            phonenumber:'',
            id:'',
            totalPrice:0,
            paymentMethod:'',
            note:'',
        }
    }

    async componentDidMount() {
        let id = this.props.userInfo? this.props.userInfo.id : null;
        if(id){
            let cartList = JSON.parse(localStorage.getItem(id)) || [];
            this.setState({
                cartList: cartList,
            })
        }
        
    }

    //always run -> nên luôn phải có điều kiện kiểm tra sự thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot)
    {
        
    }

    
    returnHome = () =>{
        if(this.props.history)
        {
            this.props.history.push(`/home`);
        } 
    }
    handleIncreaseQuantity = (item, event) => {
        event.stopPropagation(); 
        let id = this.props.userInfo.id;
        try {
            if(id){
                let cart = JSON.parse(localStorage.getItem(id)) || [];
                let existingProduct = cart.find(cartItem => cartItem.id === item.id);
            
            if (existingProduct) {
                existingProduct.quantity += 1;
                localStorage.setItem(id, JSON.stringify(cart)); 
                this.setState({ cartList: cart }); 
            }
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }
    
    handleDecreaseQuantity = (item, event) => {
        event.stopPropagation(); 
        let id = this.props.userInfo.id;
        try {
            if(id){
                let cart = JSON.parse(localStorage.getItem(id)) || [];
                let existingProduct = cart.find(cartItem => cartItem.id === item.id);
                
                if (existingProduct && existingProduct.quantity > 1) { 
                    existingProduct.quantity -= 1;
                    localStorage.setItem(id, JSON.stringify(cart)); 
                    this.setState({ cartList: cart }); 
                }
            }
            
        } catch (error) {
            console.error('Error reducing product from cart:', error);
        }
    }

    handleRemoveItem = (item, event) =>{
        event.stopPropagation(); 
        let id = this.props.userInfo.id;
        try {
            if(id){
                let cart = JSON.parse(localStorage.getItem(this.props.userInfo.id)) || [];
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                localStorage.setItem(id, JSON.stringify(cart)); 
                this.setState({ cartList: cart }); 
                toast.success('Remove item success');
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    }
    handleShowProduct = (item) =>{
        if (this.props.history) {
            this.props.history.push(`/collection/${item.id}`);
        }
    }
    orderProduct = async() =>{
        let id = this.props.userInfo.id;
        let data = [];
        try {
            let cart =  [];
            if(id){
                cart = JSON.parse(localStorage.getItem(this.props.userInfo.id));
                if(this.state.isShowOrder === false){
                    let total = 0;
                    if(cart && cart.length > 0){
                    cart.map((item,index) =>{
                        total += item.quantity * item.priceData.valuePrice
                    })
                    }
                    this.setState({
                        total:total,
                        totalPrice : total + 30000,
                        isShowOrder:true,
                    })
                }
                else{
                    let orderId = uuidv4();
                    if(this.state.paymentMethod === ''){
                        toast.error('Vui lòng chọn phương thức thanh toán!');
                        return;
                    }
                    let child = {};
                    cart.map((item,index)=>{
                        child.orderId = orderId;
                        child.userId = id;
                        child.productId = item.id;
                        child.count = item.quantity;
                        data.push(child);
                        child = {};
                    })
                    
                    let res = await createOrder({
                        data: data,
                        orderId : orderId,
                        userId : id,
                        totalPrice : this.state.totalPrice,
                        note: this.state.note,
                        paymentMethod:this.state.paymentMethod,
                        statusId:this.state.paymentMethod === 'cash'? 'x' : 'w',
                    })
                    if(res && res.errCode === 0){
                        toast.success(res.message);
                        localStorage.removeItem(id); 
                        this.setState({
                            cartList: [],
                            isShowOrder: false,
                            total: 0,
                            totalPrice: 0,
                        });
                    }
                    else
                        toast.error(res.message)
                }
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    }
    handleOnChangeSelect = (event) =>{
        this.setState({
            paymentMethod: event.target.value,
        })
    }
    handleOnChangeNote = (event) =>{
        this.setState({
            note: event.target.value,
        })
    }
    render() {
        let { cartList,isShowOrder,total,totalPrice} = this.state;
        let userInfo = this.props.userInfo;
        return (
           <>
           <HomeHeader/>
                {
                     cartList && cartList.length > 0 ?
                        <div className='cart-list-container'>
                            {
                                cartList.map((item,index) =>{
                                    return (
                                        <div className='cart-item' onClick = {() => this.handleShowProduct(item)} key={index}>
                                            <div className='rmv-cart-item' onClick={(event) => this.handleRemoveItem(item,event)}>
                                                <i class="fas fa-trash"></i>
                                            </div>
                                            <div className='img-cart-item' style={{backgroundImage: `url(${item.img})`}}>
                                            </div>
                                            <div className='name-cart-item'>
                                                {item.nameProduct}
                                            </div>
                                            <div className='quantity-cart-item'>
                                                <span>Số lượng:</span>
                                                <span>{item.quantity}</span>
                                            </div>
                                            <div className='price-cart-item'>
                                                <span>Giá:</span>
                                                <span><NumberFormat className= "currency" value={item.priceData.valuePrice} displayType='text' thousandSeparator={true} suffix={' đ'}/></span>
                                            </div>
                                            <div className='action-cart-item'>
                                                <i className="fas fa-plus" onClick={(event) => this.handleIncreaseQuantity(item,event)}></i>
                                                <i className="fas fa-minus" onClick={(event) => this.handleDecreaseQuantity(item,event)}></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                isShowOrder === false ? 
                                ''
                                :
                                <div className='body-content '>
                                    
                                    <div className='order-container '>
                                        <div className='title-order'>
                                            <span>Thông tin cá nhân</span>
                                        </div>
                                        <div className='info-order'>
                                            <div className='email-order'>
                                                Email người đặt hàng : {userInfo.email}
                                            </div>
                                            <div className='name-order'>
                                                Tên người đặt hàng : {userInfo.fullName}
                                            </div>
                                            <div className='address-order'>
                                                Địa chỉ giao hàng : {userInfo.address}
                                            </div>
                                            <div className='phone-order'>
                                                Số điện thoại : {userInfo.phonenumber}
                                            </div>
                                            <div className='note-order form-group'>
                                                <label htmlFor="">Ghi chú:</label>
                                                <input type="text" value={this.state.note} className='form-control' onChange={(event) => this.handleOnChangeNote(event)} />
                                            </div>
                                        </div>
                                        <div className='price-info'>
                                            <div className='total-order'>
                                                Tổng giá trị các sản phẩm là: 
                                                <span><NumberFormat className= "currency" value={total} displayType='text' thousandSeparator={true} suffix={' đ'}/></span>
                                            </div>
                                            <div className='ship-order'>
                                                Tiền ship: 
                                                <span><NumberFormat className= "currency" value={30000} displayType='text' thousandSeparator={true} suffix={' đ'}/></span>
                                            </div>
                                            <div className='price-order'>
                                                Tổng tiền cần thanh toán là: 
                                                <span><NumberFormat className= "currency" value={totalPrice} displayType='text' thousandSeparator={true} suffix={' đ'}/></span>
                                            </div>
                                        </div>
                                        <select name="" value={this.state.paymentMethod} onChange={(event) => this.handleOnChangeSelect(event)}>
                                            <option value="" selected hidden>Chọn phương thức thanh toán</option>
                                            <option value="cash">Tiền mặt</option>
                                            <option value="bank">Chuyển khoản</option>
                                        </select>
                                    </div>
                                    <div className='content-right-order '>
                                        <div className='img-qr'>

                                        </div>
                                    </div>
                             
                                </div>
                            }
                            <button className='btn-order'  onClick={() => this.orderProduct()}>{isShowOrder === false ?'Đặt hàng ngay' : 'Thanh toán'}</button>
                        </div>
                    
                    :
                        <div className='no-cart-item'>
                            <div className='img-no-cart-item'></div>
                            <div className='title-no-cart-item'> "Hổng" có gì trong giỏ hết</div>
                            <div className='child-title-no-cart-item'>Về trang cửa hàng để chọn mua sản phẩm bạn nhé!!</div>
                            <button className='btn-home' onClick={() => this.returnHome()}>Mua sắm ngay</button>
                        </div>
                    
                }
            <HomeFooter/>
           </>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        itemWhiteList: state.admin.itemWhiteList,
        listProduct: state.admin.listProduct,
        whiteList: state.admin.whiteList,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct : () => dispatch(actions.getAllProduct()),
        increaseItem: (item) => dispatch(actions.increaseItem(item)),
        decreaseItem: (item) => dispatch(actions.decreaseItem(item)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartList));
