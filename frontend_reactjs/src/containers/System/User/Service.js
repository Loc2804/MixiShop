import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Service.scss'
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

class Service extends Component {
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
            <div className='service-page'>
                <div className='title-body top-title'>
                    Điều khoản dịch vụ
                </div>
                <div className='info'>
                    <div>
                        <b>1. Giới thiệu</b>
                    </div>
                    <div>
                        Chào mừng quý khách hàng đến với website chúng tôi.
                    </div>
                    <div>
                        Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.
                    </div>
                    <div>
                        Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
                    </div>
                    <div>
                        <b>2. Hướng dẫn sử dụng website</b>
                    </div>
                    <div>
                        Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.
                    </div>
                    <div>
                        Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở dưới cùng trong mọi email quảng cáo.
                    </div>
                </div>
                <div className='title-footer'>
                    <div className='info'>
                        <div>
                            <b>3. Thanh toán an toàn và tiện lợi</b>
                        </div>
                        <div>
                            Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:
                        </div>
                        <div>
                            <span>Cách 1:</span> Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)
                        </div>
                        <div>
                            <span>Cách 2</span> Thanh toán sau (COD – giao hàng và thu tiền tận nơi)
                        </div>
                        <div>
                            <span>Cách 3:</span> Thanh toán online qua thẻ tín dụng, chuyển khoản
                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Service)));
