import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Introduction.scss'
import { FormattedMessage, injectIntl } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


class Introduction extends Component {
    constructor(props){
        super(props);
        this.state ={
           
        }
    }
    
    changeLanguage =(language) =>{
   
    }

    async componentDidMount(){
        
    }

    render() {
        return (
            <>
                <HomeHeader/>
                <div className='container'>
                    <div className='title title-announce'>
                        Giới thiệu
                    </div>
                    <div className='body-content'>
                        <div className='line-1'>Website chính thức và duy nhất của MixiShop. Hiện tại chúng mình chỉ nhận đơn hàng trên website chứ không nhận bất kỳ nơi nào khác nhé!</div>
                        <div className='line-2'>Nếu có ưu đãi cũng sẽ được thông báo công khai trên các kênh CHÍNH THỨC VÀ DUY NHẤT sau đây:</div>
                        <div className='line-3'>
                            Website : <a href="https://shop.mixigaming.com/" target='_blank'>https://shop.mixigaming.com/ </a>
                        </div>
                        <div className='line-4'>
                            Fanpage : <a href="https://www.facebook.com/MixiShop-182674912385853/" target='_blank'>https://www.facebook.com/MixiShop-182674912385853/</a>
                        </div>
                        <div className='line-5'>
                            Instagram : <a href="https://www.instagram.com/mixi.shop/" target='_blank'>https://www.instagram.com/mixi.shop/</a>
                        </div>
                        <div className='line-6'>
                            Email : Mixiishop@gmail.com
                        </div>
                        <div className='line-7'>
                            MixiShop xin vui lòng được phục vụ quý khách!
                        </div>
                    </div>
                </div>
                <HomeFooter/>
            </>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Introduction)));
