import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { LANGUAGES } from '../../utils';
import './HomeFooter.scss'
import { withRouter } from 'react-router-dom';

class HomeFooter extends Component {
    handleOnClickHeader =(id) =>{
        if(this.props.history)
        {
            this.props.history.push(`/pages/${id}`);
        } 
    }
    returnHome = () =>{
        if(this.props.history)
        {
            this.props.history.push(`/home`);
        } 
    }

    handleOnClickShowProduct = () =>{
        if(this.props.history)
            {
                this.props.history.push(`/collections/all`);
            } 
    }
    render() {
        return (
            <div className='home-footer'>
                <div className='content-body'>
                    <div className='info'>
                        <div className='address'>
                            <i class="fas fa-map-marker-alt"></i>
                            Địa chỉ: Yên Lãng Hà Nội
                        </div>
                        <div className='phone'>
                            <i class="fas fa-mobile"></i>
                            Số điện thoại: <span> 0822221992</span>
                        </div>
                        <div className='email'>
                            <i class="fas fa-envelope"></i>
                            Email: <span>Mixiishop@gmail.com</span>
                        </div>
                    </div>
                    <div className='policy'>
                        <div className='policy-title'>
                            chính sách
                        </div>
                        <div className='policy-item'>
                            <div className='home menu' onClick={() => this.returnHome()}>
                                Trang chủ
                            </div>
                            <div className='intro  menu' onClick={() => this.handleOnClickHeader('about-us')}>
                                Giới thiệu
                            </div>
                            <div className='product  menu' onClick={() => this.handleOnClickShowProduct()}>
                                Sản phẩm
                            </div>
                            <div className='blog menu' onClick={() => this.handleOnClickHeader('blog')}>
                                Blog
                            </div>
                            <div className='contact menu' onClick={() => this.handleOnClickHeader('contact')}>
                                Liên hệ
                            </div>
                            <div className='check menu' onClick={() => this.handleOnClickHeader('check-order')}>
                                Kiểm tra đơn hàng
                            </div>
                        </div>
                    </div>
                    <div className='support'>
                        <div className='support-title'>
                            Hỗ trợ khách hàng
                        </div>
                        <div className='support-item'>
                            <div className='find menu'>
                                Tìm kiếm
                            </div>
                            <div className='security menu' onClick={() => this.handleOnClickHeader('security')}>
                                Chính sách bảo mật
                            </div>
                            <div className='service menu' onClick={() => this.handleOnClickHeader('service')}>
                                Điều khoản dịch vụ
                            </div>
                        </div>
                    </div>
                    <div className='social-media'>
                        <div className='social-title'>
                            Nền tảng mạng xã hội
                        </div>
                        <div className='social-img'>
                            <a href="https://www.facebook.com/profile.php?id=100076687362461" target='_blank'><div className='img-fb img-bg' ></div></a>
                            <a href="https://www.instagram.com/mixi.shop/"  target='_blank'><div className='img-insta img-bg'></div></a>
                        </div>
                    </div>
                </div>
                <div className='content-footer'>
                    <div className='img-footer img-1' onClick={() => this.returnHome()}></div>
                    <div className='img-footer img-2' onClick={() => this.returnHome()}></div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => { // -> giúp sử dụng this.props.hàm bên trong mapDispatch
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));
