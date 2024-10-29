import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Contact.scss'
import { FormattedMessage, injectIntl } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { sendEmail } from '../../../services/userService';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class Contact extends Component {
    constructor(props){
        super(props);
        this.state ={
            name:'',
            email:'',
            phone:'',
            content:'',
            isShowLoading: false,
        }
    }
    
    changeLanguage =(language) =>{
   
    }

    async componentDidMount(){
        
    }

    handleOnChangeInput = (event,id) =>{
        let copyState = this.state;
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }

    clearData =() =>{
        this.setState({
            name:'',
            email:'',
            phone:'',
            content:'',
        })
    }
    handleSendEmail = async() =>{
        this.showLoadingLayout();
        let res = await sendEmail({
            name:this.state.name,
            email: this.state.email,
            phone:this.state.phone,
            content:this.state.content,
        })
        if(res && res.errCode === 0){
            toast.success(res.message);
            this.closeLoadingLayout();
            this.clearData();
        }
        else
        {
            this.closeLoadingLayout();
            toast.error(res.message);
        }
    }
    showLoadingLayout = () =>{
        this.setState({
            isShowLoading:true,
        })
    }
    closeLoadingLayout = () =>{
        this.setState({
            isShowLoading:false,
        })
    }
    render() {
        const customMarkerIcon = new L.Icon({
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });
        return (
            <LoadingOverlay
            active={this.state.isShowLoading}
            spinner
            text=''
            >
            <>
                <HomeHeader/>
                <div className='container '>
                    <div className='row contact-content'>
                        <div className='col-5 content-left'>
                            <div className='content-up'>
                                <div className='title-content'>
                                    MixiShop Liên Hệ
                                </div>
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
                            </div>
                            <div className='content-down row'>
                                <div className='title-down col-12'>
                                    Liên hệ với chúng tôi
                                </div>
                                <div className='col-12 body-content'>
                                    <input type="text" onChange={(event) => this.handleOnChangeInput(event,'name')} placeholder='Họ tên *' className='form-control' value = {this.state.name}/>
                                    <input type="text" onChange={(event) => this.handleOnChangeInput(event,'email')} placeholder='Email *' className='form-control'  value = {this.state.email}/>
                                    <input type="text" onChange={(event) => this.handleOnChangeInput(event,'phone')} placeholder='Số điện thoại *' className='form-control'  value = {this.state.phone}/>
                                    <textarea className='form-control' onChange={(event) => this.handleOnChangeInput(event,'content')} placeholder='Nhập nội dung*'  value = {this.state.content}></textarea>
                                    <button className='btn ' onClick={() => this.handleSendEmail()}>Gửi liên hệ của bạn</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-6 content-right'>
                            <MapContainer center={[21.0111213, 105.8164005]} zoom={13} style={{ height: "100%", width: "100%" }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[21.0111213, 105.8164005]} icon={customMarkerIcon}>
                                    <Popup>
                                        Mixi Shop
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
                <HomeFooter/>
            </>
            </LoadingOverlay>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Contact)));
