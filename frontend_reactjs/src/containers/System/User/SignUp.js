import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES,CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions";
import './SignUp.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { createNewUserService } from '../../../services/userService';
import { Buffer } from 'buffer';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';

class SignUp extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email :'',
            password: '', 
            fullName: '',
            address: '',
            phonenumber:'',
            avatar:'',
            previewImgURL: '',
            isOpen: false,
            isShowPassword : false,
        }
    }

    async componentDidMount() {
    }

    //always run -> nên luôn phải có điều kiện kiểm tra sự thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot)
    {

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
        let arrInput =['email', 'password', 'fullName', 'phonenumber','address', 'avatar'];
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
        //fire redux create
        if(this.checkValidateInput())
            {
                let res = await createNewUserService({
                    email: this.state.email,
                    password: this.state.password,
                    fullName:this.state.fullName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    role:'u',
                    avatar: this.state.avatar,
                });
                if(res && res.errCode === 0){
                    toast.success('Regist an account successfull');
                    this.clearAllForm();
                }
                else{
                    toast.error(res.message);
                }
            }
        else return;
        
        
    }

    clearAllForm = () =>{
        this.setState({
            email :'',
            password: '', 
            fullName: '',
            address: '',
            phonenumber:'',
            avatar:'',
            previewImgURL: '',
        })
    }

    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword : !this.state.isShowPassword,
        })
    }
    render() {
        let {email, password, fullName,address,  phonenumber,role,avatar } = this.state;
        return (
            <>
                <HomeHeader/>
                <div className='user-redux-container'>
                    <div className='title text-black-50'>
                        ĐĂNG KÝ TÀI KHOẢN
                    </div>
                    
                    <div className='user-redux-body'>
                        <div className='container'>
                            <div className='row body-signup'>
                                <div className='col-6'>
                                    <label htmlFor="">Email</label>
                                    <input type="email" className='form-control' placeholder='abc@gmail.com'
                                        value={email}
                                        onChange={(event) => {this.handleOnChangeInput(event,"email")}}
                                    />
                                </div>
                                <div className='col-6  form-group'>
                                    <label htmlFor="">Mật khẩu</label>
                                    <div className='custom-input-password'>
                                        <input type={this.state.isShowPassword === true ? 'text' : 'password'}
                                            className='form-control'  placeholder='Enter password'
                                            value={password}
                                            onChange={(event) => {this.handleOnChangeInput(event,"password")}}
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
                                <div className='col-6'>
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

                                
                                <div className='col-6'>
                                    <label htmlFor="">Ảnh đại diện</label>
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
                                <div className='col-6 mt-3'>
                                    <button className='btn btn-signup'  onClick={() => {this.handleSaveUser()}}>Đăng ký</button>
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
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
