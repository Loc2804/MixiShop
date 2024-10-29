import React, { Component } from 'react';
import { FormattedMessage,injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import './ModalProduct.scss'
import * as actions from "../../../store/actions";
// import { getAllUsers } from '../../services/userService';
// import ModalUser from './ModalUser';
import { getProductByOrder} from '../../../services/userService';
import 'react-markdown-editor-lite/lib/index.css';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NumberFormat from 'react-number-format';

class ModalProduct extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            arrProductOrder : [],
        }
    }

    async componentDidMount(){
        if(this.props.orderId){
            let orderId = this.props.orderId;
            let res = await getProductByOrder(orderId);
            if(res && res.errCode === 0){
                this.setState({
                    arrProductOrder: res.data,
                })
            }
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.orderId !== this.props.orderId) {
            this.fetchProductsByOrder();
        }
    }
    
    fetchProductsByOrder = async () => {
        let orderId = this.props.orderId;
        if (orderId) {
            let res = await getProductByOrder(orderId);
            if (res && res.errCode === 0) {
                this.setState({
                    arrProductOrder: res.data,
                });
            }
        }
    };

    toggle(){
        this.props.closeModal();
    }
    render() {
        let {isShowModal} = this.props;
        let {arrProductOrder} = this.state;
        return (
            <>
                 <Modal
                    isOpen={isShowModal} 
                    toggle={() => {this.toggle()}} 
                    className='product-modal-container container'
                    size="lg"
                    centered
                    //backdrop={true}
                >
                    <ModalHeader toggle={() =>this.toggle()}>CHI TIẾT ĐƠN HÀNG</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            {arrProductOrder && arrProductOrder.length > 0 &&
                                arrProductOrder.map((item,index) =>{
                                    console.log(item);
                                    return(
                                        <div className='col-12 content-product-order my-3' key={index}>
                                            <div className='img-product-order' style={{backgroundImage: `url(${item.productData.img})`}}>                              
                                            </div>
                                            <div className='name-price-product-order'>
                                                <div className='name-product-order'>
                                                    {item.productData.nameProduct}
                                                </div>
                                                <div className='price-product-order'>
                                                    <NumberFormat className= "currency" value={item.productData.priceData.valuePrice} displayType='text' thousandSeparator={true} suffix={' đ'}/>
                                                </div>
                                            </div>
                                            <div className='quantity-product-order'>
                                                x {item.count}
                                            </div>
                                        </div>
                                    )
                                } )
                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() =>this.toggle()}>Close</Button>
                    </ModalFooter>
                </Modal> 
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        itemWhiteList: state.admin.itemWhiteList,
        userInfo: state.user.userInfo,
        listBill: state.admin.listBill,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBill: (userId) => dispatch(actions.getAllBill(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ModalProduct));
