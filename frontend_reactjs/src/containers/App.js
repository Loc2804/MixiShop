import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from '../containers/Auth/Login'
import Header from './Header/Header';
import System from '../routes/System';
import Account from '../routes/Account.js';
import HomePage from './HomePage/HomePage.js'
import CustomScrollbars from '../components/CustomScrollbars.js';
import Contact from './System/User/Contact.js'
import Introduction from './System/User/Introduction.js'
import Blog from './System/User/Blog.js'
import CheckOrder from './System/User/CheckOrder.js'
import Service from './System/User/Service.js'
import Security from './System/User/Security.js'
import SignIn from './System/User/SignIn.js'
import SignUp from './System/User/SignUp.js'
import ForgotPassword from './System/User/ForgotPassword.js';
import { PhoneOutlined, MessageOutlined  } from '@ant-design/icons';
import { FloatButton } from 'antd';
import 'antd/dist/reset.css'; // Sử dụng phiên bản Ant Design mới hơn
import AllProduct from './System/Product/AllProduct'
import DetailTypeProduct from './System/Product/DetailTypeProduct'
import DetailProduct from './System/Product/DetailProduct.js'
import WhiteList from './System/Product/WhiteList'
import CartList from './System/Product/CartList.js'

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }
    handleClick = () =>{
        window.open('https://shop.mixigaming.com', '_blank');
    }
    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        
                        <div className="content-container">
                            <CustomScrollbars style={{height: '100vh', width:'100%'}}>
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />

                                <Route path={path.HOMEPAGE} exact component={(HomePage)} />
                                <Route path={path.CONTACT} exact component={(Contact)} />
                                <Route path={path.ABOUT} exact component={(Introduction)} />
                                <Route path={path.BLOG} exact component={(Blog)} />
                                <Route path={path.CHECK} exact component={(CheckOrder)} />
                                <Route path={path.SECURITY} exact component={(Security)} />
                                <Route path={path.SERVICE} exact component={(Service)} />

                                <Route path={path.SIGNIN} component={userIsNotAuthenticated(SignIn)} />
                                <Route path={path.ACCOUNT} component={userIsAuthenticated(Account)} />
                                <Route path={path.REGIST} exact component={(SignUp)} />
                                <Route path={path.FORGOT} exact component={(ForgotPassword)} />

                                <Route path={path.ALL_PRODUCT} exact component={(AllProduct)} />
                                <Route path={path.DETAIL_PRODUCT} exact component={(DetailProduct)}/>
                                <Route path={path.DETAIL_TYPE_PRODUCT} exact component={(DetailTypeProduct)} />
                                <Route path={path.WHITE_LIST} exact component={(WhiteList)} />
                                <Route path={path.CART_LIST} exact component={(CartList)} />

                            </Switch>  
                            </CustomScrollbars>
                        </div>
                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <FloatButton
                            icon={<PhoneOutlined  />}
                            type="primary"
                            onClick={()=> this.handleClick()}
                            className="custom-float-btn"
                            fontSizeIcon='20px'
                            style={{
                                // insetInlineEnd: 24,      // Cách lề phải 24px
                                bottom: 150,             // Cách đáy 100px
                                // fontSize: '25px !important'          // Kích thước icon
                            }}
                        />
                        <FloatButton
                            icon={<MessageOutlined style={{ fontSize: '20px', color: 'white' }} />}
                            onClick={()=> this.handleClick()}
                            type="primary"
                            className="custom-float-btn"
                            fontSizeIcon='20px'
                            style={{
                                insetInlineEnd: 24,      // Cách lề phải 24px
                                bottom: 100,             // Cách đáy 100px
                                // fontSize: '25px !important'          // Kích thước icon
                            }}
                        />
                        <ToastContainer
                            position="bottom-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />

                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);