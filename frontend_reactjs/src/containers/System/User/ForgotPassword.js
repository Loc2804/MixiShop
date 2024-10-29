import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from "../../../store/actions";
import './ForgotPassword.scss';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from  '../../../utils';
import { handleSaveChangePassword } from '../../../services/userService';
import { toast } from 'react-toastify';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { forgotPassword } from '../../../services/userService';
class ForgotPassword extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            phonenumber:'',
            email:'',
        }
    }
    
    async componentDidMount() {
     
    }
    
    async componentDidUpdate(prevProps, prevState, snapshot) {
          
    }
    handleFindPassword = async() =>{
        let res = await forgotPassword({
            phonenumber: this.state.phonenumber,
            email:this.state.email,
        })
        if(res && res.errCode === 0){
            toast.success(res.message);
            this.setState({
                phonenumber:'',
                email:'',
            })
        }
        else
            toast.error(res.message);
    }

    handleOnChange = (event,id) =>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }
    render() {     
        return (
            <Fragment> 
                <HomeHeader/>
                <div className='forgot-password-container'>
                    <div className='forgot-password-title'>
                        QUÊN MẬT KHẨU
                    </div>
                    <div className='forgot-form'>
                        <div className='announce-form'>
                            Vui lòng nhập đầy đủ thông tin để nhận lại được mật khẩu
                        </div>
                        <div className='info-form'>
                            <div className='form-group'>
                                <label htmlFor="">Email</label>
                                <input type="text" className='form-control' onChange={(event) => this.handleOnChange(event,'email')} value={this.state.email} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="">Số điện thoại</label>
                                <input type="text" className='form-control' onChange={(event) => this.handleOnChange(event,'phonenumber')} value={this.state.phonenumber} />
                            </div>
                            <button className='btn btn-forgot' onClick={() => this.handleFindPassword()}>Lấy lại mật khẩu</button>
                        </div>
                    </div>
                </div>
                <HomeFooter/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language : state.app.language,
        userInfo : state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOut : () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
