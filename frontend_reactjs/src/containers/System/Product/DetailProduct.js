import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES,CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions";
import './DetailProduct.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { getAllService, createProduct, editProduct, getProductById, getNumberProductBySize } from '../../../services/userService';
import { Buffer } from 'buffer';
import { withRouter } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';


class DetailProduct extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            product:{},
            priceProduct:'',
            arrSize:[],
            selectedSize:'',
            numProduct:0,
            isShowReturnPolicy:false,
            isShowShipPolicy:false,
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getProductById(id);
            let res_Size = await getAllService('size');
            
            if (res && res.errCode === 0 && res_Size && res_Size.errCode === 0) {
                res_Size.data.map((item) =>{
                    item.isActive = false;
                    return item;
                })
                this.setState({
                    product: res.data,
                    priceProduct:res.data.priceData.valuePrice,
                    arrSize: res_Size.data,
                });
            }
        }
        
    }

    //always run -> nên luôn phải có điều kiện kiểm tra sự thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getProductById(id);
            
            if (res && res.errCode === 0) {
                this.setState({
                    product: res.data,
                });
            }
        }
    }

    handleClickSizeBtn = async(item,index) =>{
        let { arrSize, product } = this.state;
        let res =await getNumberProductBySize(item.sizeId, product.productId);
        if(res && res.errCode === 0){
            this.setState({
                numProduct: res.data.number,
            })
        }
        else{
            this.setState({
                numProduct: 0,
            })
        }
        // Đặt tất cả các nút `isActive` thành false
        arrSize = arrSize.map((size, i) => {
            size.isActive = false; // Reset tất cả isActive về false
            return size;
        });

        // Đặt nút được chọn `isActive` thành true
        arrSize[index].isActive = true;

        // Cập nhật state với giá trị mới
        this.setState({
            arrSize: arrSize,      // Cập nhật lại mảng arrSize với trạng thái mới
            selectedSize: item.valueSize, // Lưu lại kích thước đã chọn
        });
    }
    handleShowMore = (id) =>{
        if(id === 'return'){
            this.setState({
                isShowReturnPolicy: !this.state.isShowReturnPolicy,
            })
        }
        if(id === 'ship'){
            this.setState({
                isShowShipPolicy: !this.state.isShowShipPolicy,
            })
        }
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
    render() {
        let {product,arrSize,selectedSize,numProduct} = this.state;
        return (
            <>
                <HomeHeader/>
                <div className='container detail-product-container'>
                    <div className='row'>
                        <div className='col-5 content-left-product'>
                            <div className='frm-img-product'>
                                <div className='frm-detail-product'>
                                </div>
                                <div className='img-detail-product' style={{backgroundImage: `url(${product.img})`}}>
                                </div>
                            </div>
                        </div>
                        <div className='col-7 content-right-product'>
                            <div className='detail-product-info'>
                                <div className='detail-product-name'>
                                    {product.nameProduct}
                                </div>
                                <div className='detail-product-code'>
                                    <div className='brand-product'>
                                        Thương hiệu: <span className='special-name'>Mixi</span>
                                    </div>
                                    <div className='code-product'>
                                        Mã sản phẩm: <span className='special-name'>{product.productId}</span>
                                    </div>
                                </div>
                                <div className='detail-product-price'>
                                    <NumberFormat className= "currency" value={this.state.priceProduct} displayType='text' thousandSeparator={true} suffix={' đ'}/>
                                </div>  
                                {product.isLove === 1? 
                                    <div className='love-detail-product'>
                                    </div>
                                    :
                                    ''
                                }
                                <div className='detail-product-sale'>
                                    {product && product.detailMarkdown && product.detailHTML 
                                        &&  
                                        <div dangerouslySetInnerHTML={{__html: product.detailHTML }}></div>
                                    }
                                    <div className='img-title-sale'>
                                        <div className='img-sale'></div>
                                        <div className='title-sale'>
                                            KHUYẾN MÃI - ƯU ĐÃI
                                        </div>
                                    </div>
                                </div>
                                <div className='detail-product-size'>
                                    <div className='detail-product-size-title'>
                                        <div className='title-size'>
                                            Kích thước: {selectedSize}
                                        </div>
                                        {
                                            numProduct === 0 ?
                                            ''
                                            :
                                            <div className='title-count'>
                                                Số lượng còn lại: {numProduct}
                                            </div>
                                        }
                                    </div>
                                {
                                    arrSize && arrSize.length > 0
                                    && arrSize.map((item,index) =>{
                                        return(
                                            <button 
                                                className={item.isActive === false ? 'btn btn-size' : 'btn btn-size active'} 
                                                key={index}
                                                onClick={() => this.handleClickSizeBtn(item,index)}
                                            >
                                                    {item.valueSize}
                                            </button>
                                        )
                                    })
                                }
                                </div>
                                {
                                    numProduct === 0 ?
                                    <button className='btn btn-warning btn-general'>Hết hàng</button>
                                    :
                                    <button className='btn btn-order btn-general'
                                        onClick={() => this.handleOrder(product)}
                                    >
                                        Đặt hàng
                                    </button>
                                }
                                <div className='detail-product-hotline'>
                                    Hotline: <span>0822221992</span> (7:30 - 22:00)
                                </div>
                                <div className='detail-product-intro'>
                                    <div className='intro-product '>
                                        <div className='img-intro intro-1'></div>
                                        <div className='title-intro'>Giao hàng toàn quốc</div>
                                    </div>
                                    <div className='intro-product '>
                                        <div className='img-intro intro-2'></div>
                                        <div className='title-intro'>Ưu đãi hấp dẫn</div>
                                    </div>
                                    <div className='intro-product '>
                                        <div className='img-intro intro-3'></div>
                                        <div className='title-intro'>Sản phẩm chính hãng</div>
                                    </div>
                                </div>
                                <div className='detail-product-policy'>
                                    <div className='product-policy ' onClick={() => this.handleShowMore('ship')}>
                                        Chính sách giao hàng
                                        <i className={this.state.isShowShipPolicy === false ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i>
                                    </div>
                                    {
                                        this.state.isShowShipPolicy === true ? 
                                        <div className='ship-product'>
                                            Hiện tại đang cập nhật chính sách giao hàng.
                                        </div>
                                        : 
                                        ''
                                    }
                                    
                                    <div className='product-policy' onClick={() => this.handleShowMore('return')}>
                                        Chính sách đổi trả
                                        <i className={this.state.isShowReturnPolicy === false ? "fas fa-chevron-down" : "fas fa-chevron-up"}></i>
                                    </div>
                                    {
                                        this.state.isShowReturnPolicy === true ? 
                                        <div className='return-product'>
                                            Hiện tại đang cập nhật chính sách đổi trả hàng.
                                        </div>
                                        : 
                                        ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
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
        increaseItem: () => dispatch(actions.increaseItem()),
        decreaseItem: () => dispatch(actions.decreaseItem()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailProduct));
