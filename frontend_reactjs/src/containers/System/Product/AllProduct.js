import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES,CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions";
import './AllProduct.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { getAllService, createProduct, editProduct, getProduct } from '../../../services/userService';
import { Buffer } from 'buffer';
import NumberFormat from 'react-number-format';
import HomeFooter from '../../HomePage/HomeFooter';
import HomeHeader from '../../HomePage/HomeHeader';

class AllProduct extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            listProduct:[],
            currentPage:0,
            productPerPage:8,
        }
    }

    async componentDidMount() {
        this.props.getProduct();
    }

    //always run -> nên luôn phải có điều kiện kiểm tra sự thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.listProduct !== this.props.listProduct){
            this.setState({
                listProduct : this.props.listProduct,
            })
        }
    }

    handleShowLove =(index,item)=>{
        let copyState = this.state.listProduct;
        copyState[index].showLove = !copyState[index].showLove;
        if(copyState[index].showLove === true){
            this.props.increaseItem(item);
        }
        if(copyState[index].showLove === false){
            this.props.decreaseItem(item);
        }
        this.setState({
            listProduct:copyState,
        })
    }

    handleOrder = (item) =>{
        try {
            let id = this.props.userInfo? this.props.userInfo.id : null;
            if(id){
                let cart = JSON.parse(localStorage.getItem(id)) || [];  // Lấy danh sách từ localStorage hoặc mảng rỗng
                let existingProduct = cart.find(cartItem => cartItem.id === item.id);  // Kiểm tra xem sản phẩm đã tồn tại chưa
        
                if (existingProduct) {
                    existingProduct.quantity += 1;  // Nếu sản phẩm đã tồn tại, tăng số lượng
                } else {
                    cart.push({ ...item, quantity: 1 });  // Nếu sản phẩm chưa tồn tại, thêm vào mảng
                }
        
                localStorage.setItem(id, JSON.stringify(cart));  // Lưu danh sách vào localStorage
                toast.success('Sản phẩm đã được thêm vào giỏ hàng!');  // Hiển thị thông báo
            }
            else{
                toast.error('Bạn cần đăng nhập!');  // Hiển thị thông báo
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);  // Xử lý lỗi nếu có
        }
    } 

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        this.setState({ currentPage: selectedPage });
    };
    render() {
        let {listProduct} = this.state;
        const { currentPage, productPerPage } = this.state;
        const offset = currentPage * productPerPage;
        const currentProduct = listProduct.slice(offset, offset + productPerPage);
        const pageCount = Math.ceil(listProduct.length / productPerPage);
        return (
           <>
           <HomeHeader/>
            <div className='product-show-container container mt-3'>
                <div className='row product-show-body'>
                    <div className='title-product-show col-12'>
                        <div className='title-product'>
                            TẤT CẢ SẢN PHẨM MIXI SHOP
                        </div>
                        <div className='logo-title-product'>
                        </div>
                    </div>
                    {currentProduct && currentProduct.length > 0 
                        && currentProduct.map((item,index) =>{
                            return (
                                <div className='col-3 info-product mt-3' key={index}>
                                    <div className='frm-img'>
                                        <div className='frame-product'>
                                        
                                        </div>
                                        <div className='img-product'style={{backgroundImage: `url(${item.img})`}} >
                                        </div>
                                    </div>
                                    <div className='brand-product'>
                                        <div className='brand'>
                                            MIXI
                                        </div>
                                        {item.showLove === false 
                                            ? <i className="far fa-heart" onClick={() => this.handleShowLove(index,item)}></i>
                                            : <i className="fas fa-heart" onClick={() => this.handleShowLove(index,item)}></i>
                                        }
                                    </div>
                                    <div className='name-product'>
                                        {item.nameProduct}
                                    </div>
                                    <div className='price-product'>
                                        <NumberFormat className= "currency" value={item.priceData.valuePrice} displayType='text' thousandSeparator={true} suffix={' đ'}/>
                                    </div>
                                    {item.isLove === 1 ? 
                                        <div className='love-product'>
                                        </div>
                                        :
                                        ''
                                    }
                                    {item.number > 0 ?
                                        <button className='btn btn-primary mt-2 mb-3 btn-order' onClick={() => this.handleOrder(item)}>Đặt hàng</button>
                                        :
                                        <div className='announce-count mt-2  mb-3'>Hết hàng</div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={this.handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="Prev"
                    renderOnZeroPageCount={null}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllProduct);
