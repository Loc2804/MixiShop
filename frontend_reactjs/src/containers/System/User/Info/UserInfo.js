import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../../../store/actions";
import  { editUserService ,getAllUsers, getProductByUserId , updateStatusBill , getProductByOrder}  from '../../../../services/userService';
import './UserInfo.scss';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { toast} from 'react-toastify';
import ChangePassword from '../../Admin/ChangePassword'
import ReactPaginate from 'react-paginate';
import ModalProduct from '../../Product/ModalProduct';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { //prop: có thể là chuỗi, số nguyên,object..., nhưng state = object
            id:'',
            fullName: '',
            address:'',
            email:'',
            phonenumber: '',
            isEditUser:false,
            avatar:'',

            isShowForm : false,
            arrBill : [],
            currentPage:0,
            billPerPage:2,

            isShowModal: false,
            orderIdModal:'',
        }
    }
    async componentDidMount () {
        this.props.getAllBill(this.props.userInfo.id);
        let {userInfo} = this.props;
        
        if(userInfo){
            this.setState({
                id: userInfo.id,
                fullName : userInfo.fullName,
                phonenumber : userInfo.phonenumber, 
                address : userInfo.address,
                email: userInfo.email,
                avatar: userInfo.avatar,
            })
            
        }
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
    handleOnChangeInput = (event,id) => {
        let copyState = this.state;
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }
    
    clearForm = () =>{
        this.setState({
            fullName: '',
            address:'',
            email:'',
            phonenumber: '',
            isEditUser:false,
        })
    }
    reloadInfoUser = async(id) =>{
        let user = await getAllUsers(id);
        this.setState({
            email: user.data.email,
            fullName: user.data.fullName,
            address:user.data.address,
            phonenumber: user.data.phonenumber,
        })
    }
    checkValidateInput = () =>{
        let isValid = true;
        let arrInput =[ 'fullName', 'phonenumber','address'];
        for(let i=0; i<arrInput.length; i++)
        {
            if(!this.state[arrInput[i]]) //this.state['email'] === this.state.email
            {
                isValid = false;
                toast.error('You should fill this field before save: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleOnClickButton = async() =>{
        let {isEditUser} = this.state;
        if(isEditUser === true){
            if(this.checkValidateInput())
            {
                let res = await editUserService({
                    id: this.state.id,
                    email: this.state.email,
                    fullName: this.state.fullName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    avatar:this.state.avatar,
                    roleId:'u',
                })
                if(res && res.errCode === 0){
                    toast.success('Edit info success');
                    this.reloadInfoUser(this.state.id);
                    this.clearForm();
                }
            }
        }
        if(isEditUser === false){
            this.setState({
                isEditUser: true,
            })
        }
    }
    handleShowInfo = (id) =>{
        this.setState({
            isShowForm:false,
        })
    }

    logOut = () =>{
        this.props.processLogout();
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }
    handleShowPasswordForm = () =>{
        this.setState({
            isShowForm:true,
        })
    }

    handleChangeStatus = async(item,statusId) =>{
        let res =  await getProductByOrder(item.orderId);
        let data = [];
        if(res && res.errCode === 0){
            data = res.data;
        }
        let res_new = await updateStatusBill({
            data:data,
            id: item.id,
            statusId: statusId,
        })
        if(res_new && res_new.errCode === 0){
            toast.success('Hủy đơn hàng thành công');
            this.props.getAllBill(this.props.userInfo.id);
        }
        else
            toast.error('Hủy đơn hàng thất bại');
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
        //JSX
        let {userInfo} = this.props;
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
            <div className='container'>

                <div className='row'>
                    <div className='content-left col-3'>
                        <div className='title-left'>
                            <div className='title-up'>
                                Trang tài khoản
                            </div>
                            <div className='title-down'>
                                Xin chào, {userInfo.fullName} !
                            </div>
                        </div>
                        <div className='menu-info'>
                                <div className='item-info menu' onClick={() => this.handleShowInfo()}>
                                    Thông tin tài khoản
                                </div>
                                <div className='change-password menu' onClick={() => this.handleShowPasswordForm()}>
                                    Đổi mật khẩu
                                </div>
                                <div className='logout menu' onClick={() => this.logOut()}>
                                    Đăng xuất
                                </div>
                            </div>
                    </div>
                    {
                        this.state.isShowForm === false ? 
                    
                        <div className='content-right col-8'>
                            <div className='title-right'>
                                <div className='title-left'>
                                    Tài khoản
                                </div>
                                <button className='btn btn-right btn-warning' onClick={() => this.handleOnClickButton()}>
                                    {this.state.isEditUser === false ?'Chỉnh sửa thông tin' : 'Lưu thông tin'}
                                </button>
                            </div>
                            {this.state.isEditUser === false ? 
                                <div className='info-user'>
                                    <div className='email'>
                                        Email: {this.state.email}
                                    </div>
                                    <div className='fullname'>
                                        Tên tài khoản: {this.state.fullName}
                                    </div>
                                    <div className='address'>
                                        Địa chỉ: {this.state.address}
                                    </div>
                                    <div className='phonenumber'>
                                        Số điện thoại: {this.state.phonenumber}
                                    </div>
                                </div>
                                :
                                <div className='info-user'>
                                    <div className='email'>
                                        Email: {this.state.email}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="">Họ và tên</label>
                                        <input type="text" className='form-control' placeholder='' value={this.state.fullName} onChange={(event) => this.handleOnChangeInput(event,'fullName')}/>
                                    </div>
                                    <div className='form-group'>
                                        Địa chỉ
                                        <input type="text" className='form-control' placeholder='' value={this.state.address} onChange={(event) => this.handleOnChangeInput(event,'address')}/>
                                    </div>
                                    <div className='form-group'>
                                        Số điện thoại
                                        <input type="text" className='form-control' placeholder='' value={this.state.phonenumber} onChange={(event) => this.handleOnChangeInput(event,'phonenumber')}/>
                                    </div>
                                </div>
                            }
                            <div className='title-bill'>
                                Đơn hàng của bạn
                            </div>
                            <div className='table-order-product'>
                                <table id="customers">
                                    <thead>
                                        <tr>
                                            <th>Tên người mua</th>
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
                                                    <td>{item.userDataBill.fullName}</td>
                                                    <td>{item.totalPrice}</td>
                                                    <td>{item.note}</td>
                                                    <td>{item.paymentMethod}</td>
                                                    <td>{item.statusData.valueStatus}</td>
                                                    <td>
                                                        <button className="btn-detail"  
                                                            onClick={()=> this.handleSeeDetail(item)}>
                                                            <i class="fas fa-info-circle"></i>
                                                        </button>
                                                        <button className="btn-delete"
                                                            disabled={isDisabled}
                                                            onClick={()=> this.handleChangeStatus(item,'c')}>
                                                            <i class="fas fa-ban"></i>
                                                        </button>
                                                    </td> 
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
                            </div>
                        :
                        <div className='content-right col-8'>
                            <div className='title title-change-password'>
                                ĐỔI MẬT KHẨU
                            </div>
                            <ChangePassword/>
                        </div>
                    }
                </div>
            </div>
            </>
            
            
        )
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
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        setRoleUser : (role) => dispatch(actions.setUserRole(role)),
        processLogout: () => dispatch(actions.processLogout()),
        getAllBill: (userId) => dispatch(actions.getAllBill(userId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfo));
