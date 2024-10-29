import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';

import ChangePassword from '../containers/System/Admin/ChangePassword';
import ManageSlide from '../containers/System/Admin/ManageSlide';
import ManageProduct from '../containers/System/Admin/ManageProduct';
import ManageBill from '../containers/System/Admin/ManageBill';
class System extends Component {
    render() {     
        const { systemMenuPath, isLoggedIn, userInfo } = this.props;
        return (
            userInfo && userInfo.roleId === 'ad' ? (
                <React.Fragment>
                    {isLoggedIn && <Header />} 
                    <div className="system-container">
                        <div className="system-list">
                            <Switch>
                                <Route path="/system/user-redux" component={UserRedux} /> 
                                <Route path="/system/change-password" component={ChangePassword} /> 
                                <Route path="/system/manage-slide" component={ManageSlide} /> 
                                <Route path="/system/manage-product" component={ManageProduct} /> 
                                <Route path="/system/manage-bill" component={ManageBill} /> 
                                <Route component={() => <Redirect to={systemMenuPath} />} />
                            </Switch>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <div>
                    {isLoggedIn && <Header />} 
                    <div className='title mt-3 text-danger'>
                        BẠN KHÔNG CÓ QUYỀN HẠN CỦA ADMIN ĐỂ SỬ DỤNG CÁC CHỨC NĂNG NÀY !
                    </div>
                </div>
            )
            
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo : state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
