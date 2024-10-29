import React, { Component } from 'react';
import { FormattedMessage,injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import './ManageBill.scss'
import * as actions from "../../../store/actions";
// import { getAllUsers } from '../../services/userService';
// import ModalUser from './ModalUser';
import { deleteProduct ,updateStatusBill} from '../../../services/userService';
// import { emitter } from '../../utils/emitter';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalProduct from '../Product/ModalProduct';

class ManageBill extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            arrBill : [],
            currentPage:0,
            billPerPage:5,
            isShowModal:false,
            orderIdModal:'',
        }
    }

    async componentDidMount(){
        this.props.getAllBill('ALL');
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.listBill !== this.props.listBill)
        {
            this.setState({
                arrBill: this.props.listBill,
            })
        }
    }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        this.setState({ currentPage: selectedPage });
    };

    handleChangeStatus = async(item,statusId) =>{
        let res = await updateStatusBill({
            id: item.id,
            statusId: statusId,
        })
        if(res && res.errCode === 0){
            toast.success(res.message);
            this.props.getAllBill('ALL');
        }
        else
            toast.error(res.message);
    }

    handleSeeDetail = async(item) =>{
        this.setState({
            isShowModal:true,
            orderIdModal:item.orderId,
        })
    }
    closeModal=() =>{
        this.setState({
            isShowModal:false,
            orderIdModal:'',
        })
    }
    render() {
        let arrBill = this.state.arrBill || [];
        const { currentPage, billPerPage } = this.state;
        const offset = currentPage * billPerPage;
        const currentBill = arrBill.slice(offset, offset + billPerPage);
        const pageCount = Math.ceil(arrBill.length / billPerPage);
        return (
            <>
                <ModalProduct
                    isShowModal = {this.state.isShowModal}
                    orderId = {this.state.orderIdModal}
                    closeModal = {this.closeModal}
                />
                <div className='users-table my-4'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Mã hóa đơn</th>
                                <th>Tên người mua</th>
                                <th>Địa chỉ</th>
                                <th>SĐT</th>
                                <th>Tổng giá trị</th>
                                <th>Ghi chú</th>
                                <th>Hình thức thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            currentBill && currentBill.map((item,index) =>{
                                
                                let isDisabled = item.statusId === 'c' || item.statusId === 'y'? true: false;
                                return(  
                                    <tr key={index}>  
                                        <td>{item.orderId}</td>
                                        <td>{item.userDataBill.fullName}</td>
                                        <td>{item.userDataBill.address}</td>
                                        <td>{item.userDataBill.phonenumber}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.note}</td>
                                        <td>{item.paymentMethod}</td>
                                        <td>{item.statusData.valueStatus}</td>
                                        {item.paymentMethod === 'cash' ?
                                            <td>
                                                <button className="btn-ship"
                                                    disabled={isDisabled}
                                                    onClick={()=> this.handleChangeStatus(item,'g')}>   
                                                    <i class="fas fa-truck"></i>
                                                </button>
                                                <button className="btn-complete"
                                                    disabled={isDisabled}
                                                    onClick={()=> this.handleChangeStatus(item,'y')}>
                                                    <i class="fas fa-check"></i>
                                                </button>
                                                <button className="btn-detail"
                                                    onClick={()=> this.handleSeeDetail(item)}>
                                                    <i class="fas fa-info-circle"></i>
                                                </button>
                                            </td> 
                                            :
                                            <td>
                                                <button className="btn-paid"
                                                    disabled={isDisabled}
                                                    onClick={()=> this.handleChangeStatus(item,'o')}>
                                                    <i class="fas fa-check-circle"></i>
                                                </button>
                                                <button className="btn-ship"
                                                    disabled={isDisabled}
                                                    onClick={()=> this.handleChangeStatus(item,'g')}>
                                                    <i class="fas fa-truck"></i>
                                                </button>
                                                <button className="btn-complete"
                                                    disabled={isDisabled}
                                                    onClick={()=> this.handleChangeStatus(item,'y')}>
                                                    <i class="fas fa-check"></i>
                                                </button>
                                                <button className="btn-detail"
                                                    onClick={()=> this.handleSeeDetail(item)}>
                                                    <i class="fas fa-info-circle"></i>
                                                </button>
                                            </td> 
                                        }
                                    </tr>
                                 )
                            })
                        } 
                        </tbody>
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ManageBill));
