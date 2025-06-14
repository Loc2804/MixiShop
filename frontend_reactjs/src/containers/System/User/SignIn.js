import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../../store/actions";
import  { handleLoginApi }  from '../../../services/userService';
import './SignIn.scss';
import { FormattedMessage } from 'react-intl';


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { //prop: có thể là chuỗi, số nguyên,object..., nhưng state = object
            username: '',
            password:'',
            isShowPassword : false,
            errMessage:'',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleLogin = async() =>{
        this.setState({
            errMessage: '',
        });
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !==0)
            {
                this.setState({
                    errMessage: data.message,
                });
            }
            else if(data && data.errCode ===0){
                this.setState({
                    errMessage: data.message,
                });
                this.props.setRoleUser(data.user.roleId);
                if (data.user.roleId === 'ad') {
                    this.props.userLoginSuccess(data.user);
                    this.props.navigate('/system/user-redux');
                } else if (data.user.roleId === 'u') {
                    this.props.userLoginSuccess(data.user);
                    this.props.navigate('/account/info');
                }
                
            }
        } catch (error) {
            if(error.response)
            {
                if(error.response.data)
                {
                    this.setState({
                        errMessage: error.response.data.message,   
                    });
                }
            }
        }
    }

    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    }

    handleKeyDown = (event) =>{
        if(event.key === 'Enter')
        {
            this.handleLogin();
        }
    }

    handleFindPassword = () =>{
        if(this.props.history)
        {
            this.props.history.push(`/pages/forgot-password`);
        } 
    }
    render() {    
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center text-login' >Đăng nhập</div>
                        <div className='col-12 form-group login-input'>
                            <label >Username:</label>
                            <input type="text" className='form-control' placeholder='Enter your username' value={this.state.username}
                            onChange={(event) => {this.handleOnChangeUsername(event)}}/> 
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label >Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'Text' : 'Password'} className='form-control' placeholder='Enter your password' 
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />   
                                <span onClick={() => {this.handleShowHidePassword()}}> 
                                    <i className= {this.state.isShowPassword? 'far fa-eye' : 'far fa-eye-slash'}></i> 
                                </span>
                            </div>
                        </div>    
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => {this.handleLogin()}}> Login </button>
                        </div>
                        <div className='col-12 '>
                            <span className='forgot-password' onClick={() => this.handleFindPassword()}>Forgot your password ?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or login with: </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        setRoleUser : (role) => dispatch(actions.setUserRole(role)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
