import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES,CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions";
import './DetailTypeProduct.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { getAllService, createProduct, editProduct, getProductByType } from '../../../services/userService';
import { Buffer } from 'buffer';
import { withRouter } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';

class DetailTypeProduct extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            listProduct:[],
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.typeId){
            let typeId = this.props.match.params.typeId;
            let res = await getProductByType(typeId);
            
            let products = [];
            if(res && res.data){
                products = res.data;
                products.map((item,index) =>({
                    ...item,
                    showLove: false // Đặt giá trị mặc định cho showLove
                }));
            }
            if(res && res.errCode === 0){
                this.setState({
                    listProduct: products,
                })
            }
        }
    }

    //always run -> nên luôn phải có điều kiện kiểm tra sự thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (this.props.match.params.typeId !== prevProps.match.params.typeId) {
            let typeId = this.props.match.params.typeId;
            let res = await getProductByType(typeId);
            
            let products = [];
            if (res && res.data) {
                products = res.data.map(item => ({
                    ...item,
                    showLove: false // Đặt giá trị mặc định cho showLove
                }));
            }
    
            if (res && res.errCode === 0) {
                this.setState({
                    listProduct: products,
                });
            }
        }
    }

    handleShowLove =(index)=>{
        let copyState = this.state.listProduct;
        copyState[index].showLove = !copyState[index].showLove;
        if(copyState[index].showLove === true){
            this.props.increaseItem();
        }
        if(copyState[index].showLove === false){
            this.props.decreaseItem();
        }
        this.setState({
            listProduct:copyState,
        })
    }
    render() {
        let {listProduct} = this.state;
        return (
            <>
            <HomeHeader/>
            <div className='product-show-container container mt-3'>
                <div className='row product-show-body'>
                    <div className='title-product-show col-12'>
                        <div className='title-product'>
                            SẢN PHẨM MIXI SHOP
                        </div>
                        <div className='logo-title-product'>
                        </div>
                    </div>
                    {listProduct && listProduct.length > 0 
                        && listProduct.map((item,index) =>{
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
                                            ? <i className="far fa-heart" onClick={() => this.handleShowLove(index)}></i>
                                            : <i className="fas fa-heart" onClick={() => this.handleShowLove(index)}></i>
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
                                        <button className='btn btn-primary mt-2 btn-order'>Đặt hàng</button>
                                        :
                                        <div className='announce-count mt-2'>Hết hàng</div>
                                    }
                                </div>
                            )
                        })
                    }
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        increaseItem: () => dispatch(actions.increaseItem()),
        decreaseItem: () => dispatch(actions.decreaseItem()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailTypeProduct));
