import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES,CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions";
import './UserReudx.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { getAllService, getAllUsers , editUserService , createNewUserService , deleteUserService} from '../../../services/userService';
import { Buffer } from 'buffer';
class UserRedux extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            userEditId:'',
            roleArr : [],
            email :'',
            password: '', 
            fullName: '',
            address: '',
            phonenumber:'',
            role: '',
            avatar:'',
            action : CRUD_ACTIONS.CREATE,
            previewImgURL: '',
            listUsers: [],
            isOpen: false,
            isShowPassword : false,
        }
    }

    async componentDidMount() {
        let res = await getAllService('role');
        let users = await getAllUsers('ALL');
        if(res && res.errCode === 0){
            this.setState({
                roleArr: res.data,
            })
        }
        if(users && users.errCode ===0 ){
            this.setState({
                listUsers: users.data,
            })
        }
    }

    //always run -> nên luôn phải có điều kiện kiểm tra sự thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot)
    {
        await this.loadListUsersAgain();
    }

    loadListUsersAgain = async() =>{
        let users = await getAllUsers('ALL');
        if(users && users.errCode ===0 ){
            this.setState({
                listUsers: users.data,
            })
        }
    }
    handleOnChangImage = async(event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file)
        {
            let base64 = await CommonUtils.getBase64(file);
            const objectURL = URL.createObjectURL(file); //api của html -> tạo url xem ảnh trên gg
            this.setState({
                previewImgURL: objectURL,
                avatar: base64,
            })
        }
    }

    openPrivewImage = () =>{
        if(!this.state.previewImgURL) return;

        this.setState({
            isOpen:true,
        })
    }

    handleOnChangeInput = (event,id) =>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }
    checkValidateInput = () =>{
        let isValid = true;
        let arrInput =['email', 'password', 'fullName', 'phonenumber','address', 'role', 'avatar'];
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

    handleSaveUser = async() =>{
        let {action} = this.state; // let action = this.state.action
        if(action === CRUD_ACTIONS.CREATE)
        {
            //fire redux create
            if(this.checkValidateInput())
                {
                    let res = await createNewUserService({
                        email: this.state.email,
                        password: this.state.password,
                        fullName:this.state.fullName,
                        address: this.state.address,
                        phonenumber: this.state.phonenumber,
                        role:this.state.role,
                        avatar: this.state.avatar,
                    });
                    if(res && res.errCode === 0){
                        toast.success('Create user success');
                        this.clearAllForm();
                    }
                    
                }
            else return;
        }
        if(action === CRUD_ACTIONS.EDIT)
        {
            //fire redux edit
            if(this.checkValidateInput())
            {
                let res = await editUserService({
                    id: this.state.userEditId,
                    email: this.state.email,
                    password: this.state.password,
                    fullName: this.state.fullName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    roleId:this.state.role,
                    avatar:this.state.avatar,
                })
                if(res && res.errCode === 0){
                    toast.success('Edit user success');
                    this.clearAllForm();
                }
            }
        }
        
    }
    handleEditUserFromParent = (user)=>{
        let imgBase64 = '';
        if(user.avatar)
        {
            imgBase64 = Buffer.from(user.avatar,'base64').toString('binary');
        }
        

        this.setState({
            email:user.email,
            password: 'nothing...',
            fullName:user.fullName,
            address:user.address,
            phonenumber:user.phonenumber,
            gender: user.gender ,
            role: user.roleId,
            position : user.positionId,
            avatar:imgBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImgURL: imgBase64,
        });
    }

    clearAllForm = () =>{
        this.setState({
            email :'',
            password: '', 
            fullName: '',
            address: '',
            phonenumber:'',
            role: '',
            avatar:'',
            action : CRUD_ACTIONS.CREATE,
            previewImgURL: '',
        })
    }

    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword : !this.state.isShowPassword,
        })
    }
    render() {

        let roles = this.state.roleArr;
        

        let {email, password, fullName,address,  phonenumber,role,avatar } = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    QUẢN LÍ NGƯỜI DÙNG
                </div>
                
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>Thêm mới người dùng</div>
                            <div className='col-6 '>
                                <label htmlFor="">Email</label>
                                <input type="email" className='form-control' placeholder='abc@gmail.com'
                                    value={email}
                                    onChange={(event) => {this.handleOnChangeInput(event,"email")}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} 
                                />
                            </div>
                            <div className='col-6  form-group'>
                                <label htmlFor="">Mật khẩu</label>
                                <div className='custom-input-password'>
                                    <input type={this.state.isShowPassword === true ? 'text' : 'password'}
                                        className='form-control'  placeholder='Enter password'
                                        value={password}
                                        onChange={(event) => {this.handleOnChangeInput(event,"password")}}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} 
                                    />
                                    <span onClick={() => {this.handleShowHidePassword()}}> 
                                        <i className= {this.state.isShowPassword? 'far fa-eye' : 'far fa-eye-slash'}></i> 
                                    </span>
                                </div>
                            </div>         

                            <div className='col-6'>
                                <label htmlFor="">Họ và tên</label>
                                <input type="text" className='form-control'  placeholder='Smith'
                                    value={fullName}
                                     onChange={(event) => {this.handleOnChangeInput(event,"fullName")}}/>
                            </div>
                            <div className='col-3'>
                                <label htmlFor="">Số điện thoại</label>
                                <input type="text" className='form-control'   placeholder='091******759'
                                    value={phonenumber}
                                    onChange={(event) => {this.handleOnChangeInput(event,"phonenumber")}}/>
                            </div>
                            <div className='col-6'>
                                <label htmlFor="">Địa chỉ</label>
                                <input type="text" className='form-control'  placeholder='Au Co, Da Nang'
                                    value={address}
                                     onChange={(event) => {this.handleOnChangeInput(event,"address")}}/>
                            </div>

                            <div className='col-4'>
                                <label htmlFor="">Vai trò</label>
                                <select name="" className='form-control'
                                    value={this.state.role} 
                                    onChange={(event) => {this.handleOnChangeInput(event,'role')}}>
                                    <option disabled selected hidden value="">Choose...</option>
                                    {roles && roles.length >0 
                                        && roles.map((item,index) => {
                                            return (
                                                <option key={index} value={item.roleId}>{item.valueRole}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        
                               
                            <div className='col-4'>
                                <label htmlFor="">Hình ảnh</label>
                                <div className='preview-img-container'>
                                    <input type="file" id="previewImg" hidden
                                        onChange={(event) => {this.handleOnChangImage(event)}}    
                                    />
                                    <label htmlFor="previewImg" className='label-upload'><FormattedMessage id="manage-user.upload"/> <i className="fas fa-upload"></i></label>
                                    <div className='preview-image' style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={() => {this.openPrivewImage()}}
                                    >  
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 mt-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => {this.handleSaveUser()}}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.save"/>  : <FormattedMessage id="modal.add"/>}       
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                   handleEditUserFromParent = {this.handleEditUserFromParent}
                                   action = {this.state.action}
                                   listUsers = {this.state.listUsers}
                                />    
                            </div>       
                        </div>             
                    </div>
                </div>           
                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}     
                    />
                }
            </div>
            
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
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
