import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './CheckOrder.scss'
import { FormattedMessage, injectIntl } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as actions from "../../../store/actions";
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA v2
import { toast } from 'react-toastify';

class CheckOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            recaptchaToken: '', // Store the reCAPTCHA token
            isShowResult: false,
            labelOrder : [],
            allBill:[],
        };
        this.recaptchaRef = React.createRef(); // Reference for the reCAPTCHA widget
    }

    async componentDidMount(){
        this.props.getAllBill('ALL');
    }
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.listBill !== this.props.listBill)
        {
            this.setState({
                allBill: this.props.listBill,
            })
        }
    }
    changeLanguage = (language) => {
        // Implement your language change logic here
    }

    handlePhoneChange = (event) => {
        this.setState({ phone: event.target.value });
    }

    onVerify = (token) => {
        // Save the reCAPTCHA token when user completes the challenge
        this.setState({ recaptchaToken: token });
    }

    handleSubmit = () => {
        let { phone, recaptchaToken ,allBill,labelOrder} = this.state;
        // Ensure the user has completed the reCAPTCHA
        if (!recaptchaToken || !phone) {
            toast.error('Hãy điền đầy đủ các thông tin và nhấn vào captcha!');
            return;
        }
        let label = [];
        if(allBill && allBill.length > 0){
            allBill.map((item) =>{
                if(item.userDataBill.phonenumber === phone){
                    label.push(item);
                }
            })
        }
        this.setState({
            isShowResult: true,
            labelOrder : label,
        });
    }

    render() {
        let { labelOrder} = this.state;
        return (
            <>
                <HomeHeader />

                <div className='container-check-order'>
                    <div className='capcha-form'>
                        <div className='title-check-order'>
                            <i className="fas fa-search"></i>
                            Kiểm tra đơn hàng của bạn
                        </div>
                        <div className='form-group'>
                            <label htmlFor="">Số điện thoại</label>
                            <input 
                                type="text" placeholder='0909 xxx xxx' 
                                value={this.state.phone} 
                                className='form-control'
                                onChange={(event) => this.handlePhoneChange(event)}
                            />
                        </div>
                        
                        <div className='g-recaptcha'>
                            {/* reCAPTCHA v2 widget */}
                            <ReCAPTCHA
                                sitekey="6Lep8UkqAAAAAEx_K2LX81tgu13kWmalSH6IWLy7" // Replace with your site key for reCAPTCHA v2
                                onChange={this.onVerify}
                                ref={this.recaptchaRef}
                            />
                        </div>

                        <div className='contact-label'>
                            Nếu quý khách có bất kỳ thắc mắc nào, xin vui lòng gọi <b>0822221992</b>
                        </div>

                        <button
                            className='btn btn-warning'
                            onClick={this.handleSubmit} // Submit form
                        >
                            Kiểm tra đơn hàng
                        </button>
                    </div>
                    {this.state.isShowResult === true ?
                        <div className='label-result'>
                            {labelOrder && labelOrder.length > 0 &&
                                labelOrder.map((item,index) =>{
                                    return(
                                        <div className='label-result-child m-3' key={index}>
                                            <span>{item.userDataBill.fullName} </span>
                                            <span>có đơn hàng: </span>
                                            <span>{item.statusData.valueStatus}!</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        ''
                    }
                </div>

                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        itemWhiteList: state.admin.itemWhiteList,
        userInfo: state.user.userInfo,
        listBill: state.admin.listBill,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllBill: (userId) => dispatch(actions.getAllBill(userId)),
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CheckOrder)));
