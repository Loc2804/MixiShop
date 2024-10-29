import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import * as actions from "../../store/actions";
import { FormattedMessage, injectIntl } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router-dom';
import {getAllService} from '../../services/userService';
import { push } from "connected-react-router";
import { toast } from 'react-toastify';

class HomeHeader extends Component {
    constructor(props){
        super(props);
        this.state ={
            type:[],
            isShowSearch:false,
            placeholderText: 'Tìm kiếm các sản phẩm ở đây...', // Text cho placeholder
            currentPlaceholder: '', // Placeholder hiện tại
            typingIndex: 0, // Chỉ số để theo dõi vị trí ký tự đang hiển thị
            isDeleting: false, // Trạng thái đang xóa chữ
            itemWhiteList: '',
            cartList:[],
        }
    }
    changeLanguage =(language) =>{
        //fire redux events: actions
       this.props.changeLanguageAppRedux(language);
    }
    returnHome = () =>{
        if(this.props.history)
        {
            this.props.history.push(`/home`);
        } 
    }
    async componentDidMount(){
        let res = await getAllService('type');
        let id = this.props.userInfo ? this.props.userInfo.id : null;
        let cartList = []
        if(id){
            cartList = JSON.parse(localStorage.getItem(id));
        }
        if(res && res.errCode === 0){
            this.setState({
                cartList:cartList,
                type : res.data,
                itemWhiteList: this.props.whiteListItem,
            })
        }
        this.typingEffect();
    }
    componentDidUpdate(prevProps, prevState){
        
    }
    handleOnClickHeader =(id) =>{
        if(this.props.history)
        {
            this.props.history.push(`/pages/${id}`);
        } 
    }

    handleShowSearchBanner = () =>{
        this.setState({
            isShowSearch: !this.state.isShowSearch,
        })
    }
       // Hàm để tạo hiệu ứng chữ chạy cho placeholder
       typingEffect = () => {
        const { placeholderText, typingIndex, currentPlaceholder, isDeleting } = this.state;

        // Nếu đang gõ và chưa đến cuối chữ
        if (!isDeleting && typingIndex < placeholderText.length) {
            this.setState({
                currentPlaceholder: currentPlaceholder + placeholderText.charAt(typingIndex),
                typingIndex: typingIndex + 1
            });

            setTimeout(this.typingEffect, 100); // Tiếp tục gõ
        }
        // Nếu đã gõ xong, bắt đầu quá trình xóa
        else if (isDeleting && typingIndex > 0) {
            this.setState({
                currentPlaceholder: currentPlaceholder.slice(0, typingIndex - 1),
                typingIndex: typingIndex - 1
            });

            setTimeout(this.typingEffect, 100); // Tiếp tục xóa
        }
        // Khi gõ xong toàn bộ và chuyển sang xóa
        else if (!isDeleting && typingIndex === placeholderText.length) {
            this.setState({ isDeleting: true });
            setTimeout(this.typingEffect, 1000); // Dừng lại 1 giây trước khi xóa
        }
        // Khi xóa hết toàn bộ, chuyển sang gõ lại
        else if (isDeleting && typingIndex === 0) {
            this.setState({ isDeleting: false });
            setTimeout(this.typingEffect, 500); // Dừng lại 0.5 giây trước khi bắt đầu gõ lại
        }
    }

    handleOnLogOut = () =>{
        this.props.processLogout();
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }

    handleOnClickAccount = () =>{
        if (this.props.history) {
            this.props.history.push('/account/info');
        }
    }

    handleShowProductByTypeId = (event,item) =>{
        event.stopPropagation();
        if (this.props.history) {
            this.props.history.push(`/collections/${item.typeId}`);
        }
    }

    handleShowAllProduct = () =>{
        if (this.props.history) {
            this.props.history.push(`/collections/all`);
        }
    }
    
    handleOpenWhiteList = () =>{
        if (this.props.history) {
            this.props.history.push(`/whitelist-product`);
        }
    }

    handleShowProduct = (item) =>{
        if (this.props.history) {
            this.props.history.push(`/collection/${item.id}`);
        }
    }

    handleOpenCartList = () =>{
        if(this.props.isLoggedIn === true){
            if (this.props.history) {
                this.props.history.push(`/cartlist-product`);
            }
        }
        else{
            if (this.props.history) {
                this.props.history.push(`/pages/signin`);
            }
        }
        
    }
    handleIncreaseQuantity = (item, event) => {
        event.stopPropagation(); 
        try {
            let cart = JSON.parse(localStorage.getItem(this.props.userInfo.id)) || [];
            let existingProduct = cart.find(cartItem => cartItem.id === item.id);
            
            if (existingProduct) {
                existingProduct.quantity += 1;
                localStorage.setItem(this.props.userInfo.id, JSON.stringify(cart)); 
                this.setState({ cartList: cart }); 
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }
    
    handleDecreaseQuantity = (item, event) => {
        event.stopPropagation(); 
        try {
            let cart = JSON.parse(localStorage.getItem(this.props.userInfo.id)) || [];
            let existingProduct = cart.find(cartItem => cartItem.id === item.id);
            
            if (existingProduct && existingProduct.quantity > 1) { 
                existingProduct.quantity -= 1;
                localStorage.setItem(this.props.userInfo.id, JSON.stringify(cart)); 
                this.setState({ cartList: cart }); 
            }
        } catch (error) {
            console.error('Error reducing product from cart:', error);
        }
    }

    handleRemoveItem = (item, event) =>{
        event.stopPropagation(); 
        try {
            let cart = JSON.parse(localStorage.getItem(this.props.userInfo.id)) || [];
            cart = cart.filter(cartItem => cartItem.id !== item.id);
            localStorage.setItem(this.props.userInfo.id, JSON.stringify(cart)); 
            this.setState({ cartList: cart }); 
            toast.success('Remove item success');
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    }

    
    render() {
        let {type, isShowSearch,currentPlaceholder} = this.state;
        let {isLoggedIn} = this.props;
        let { cartList } = this.state; 
        let length = cartList ? cartList.length : 0;
        cartList = cartList ? cartList.slice(0,2) : null;
        return (
            <div className='container-fluid home-header-page'>
                <div className='row'>
                    <div className='col-3 logo' >
                        <div className='img' onClick={() => this.returnHome()}></div>  
                    </div>
                    <div className='col-6 '>
                        {isShowSearch === true ?  
                            <div className='search-info form-group'>
                                <div className='input-search'>
                                    <input type="text" 
                                        placeholder={currentPlaceholder} 
                                        className='form-control' 
                                    />
                                    <div className='icon-search'>
                                        <i class="fas fa-search"></i>
                                    </div>
                                </div>
                                <label htmlFor="">Áo mixi, Cốc giữ nhiệt, Lego...</label>
                            </div>
                            :
                            <div className='info'>
                                <span className='home' onClick={() => this.returnHome()}>
                                    Trang chủ
                                </span>
                                <span className='intro' onClick={() => this.handleOnClickHeader('about-us')}>
                                    Giới thiệu
                                </span>
                                <span className='pro'  onClick={() => this.handleShowAllProduct()}>
                                    <div className='logo-pro'></div>
                                    Sản phẩm
                                    <i class="fas fa-chevron-down"></i>
                                    <div className='menu-pro'>
                                        {type && type.length > 0 &&
                                            type.map((item,index) =>{
                                                return(
                                                    <div className='child-menu' key={item.typeId} onClick={(event) => this.handleShowProductByTypeId(event,item)}>
                                                        {item.valueType}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </span>
                                <span className='blog' onClick={() => this.handleOnClickHeader('blog')}>
                                    Blog
                                </span>
                                <span className='contact' onClick={() => this.handleOnClickHeader('contact')}>
                                    Liên hệ
                                </span>
                                <span className='check' onClick={() => this.handleOnClickHeader('check-order')}>
                                    Kiểm tra đơn hàng
                                </span>
                            </div>
                        }
                    </div>
                    <div className='col-3 item'>
                        <i class="fas fa-search search" onClick={() => this.handleShowSearchBanner()}></i>
                        <i class="far fa-user user">
                            <div className='menu-user'>
                                <span class="triangle"></span>
                                {isLoggedIn === false ? 
                                    <div>
                                        <div className='signIn item-user' onClick={() => this.handleOnClickHeader('signin')}>
                                            Đăng nhập
                                        </div>
                                        <div className='signUp item-user' onClick={() => this.handleOnClickHeader('regist')}>
                                            Đăng ký
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className='signIn item-user' onClick={() => this.handleOnClickAccount()}>
                                            Tài khoản
                                        </div>
                                        <div className='signUp item-user' onClick={() => this.handleOnLogOut()}>
                                            Đăng xuất
                                        </div>
                                    </div>
                                }
                            </div>
                        </i>
                        <i className="far fa-heart whitelist" onClick={() => this.handleOpenWhiteList()}>
                            <div className='white-list-item'>
                                {this.props.itemWhiteList}
                            </div>
                        </i>
                        <i className="fas fa-shopping-bag bag" onClick={() => this.handleOpenCartList()}>
                            <div className='bag-item'>
                                {length}
                            </div>
                            <div className='menu-cart-list'>
                                <div className='title-cart-list special'>
                                    Các sản phẩm trong giỏ hàng
                                </div>
                                {cartList && cartList.length > 0 ?
                                    cartList.map((item,index) =>{
                                        return (
                                            <div className='cart-item' key={index} onClick = {() => this.handleShowProduct(item)}>
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
                                                <div className='action-cart-item'>
                                                    <i className="fas fa-plus" onClick={(event) => this.handleIncreaseQuantity(item,event)}></i>
                                                    <i className="fas fa-minus" onClick={(event) => this.handleDecreaseQuantity(item,event)}></i>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className='title-cart-list'>
                                        Hiện không có sản phẩm nào được thêm vào giỏ hàng !
                                    </div>
                                }
                                <div className='all-cart-item mt-3' onClick={() => this.handleOpenWhiteList()}>
                                    <button className='btn btn-all-cart-item'>--- Xem tất cả ---</button>
                                </div>
                            </div>
                        </i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        itemWhiteList: state.admin.itemWhiteList,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => { // -> giúp sử dụng this.props.hàm bên trong mapDispatch
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        navigate: (path) => dispatch(push(path)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomeHeader)));
