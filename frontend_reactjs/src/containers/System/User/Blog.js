import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Blog.scss'
import { FormattedMessage, injectIntl } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


class Blog extends Component {
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
                        Tin tức
                    </div>
                    <div className='announce'>
                        Hiện tại chưa có tin tức nào...Đang trong thời gian cập nhật
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Blog)));
