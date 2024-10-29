import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Security.scss'
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

class Security extends Component {
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
            <div className='privacy'>
                <div className='title-body top-title'>
                    Chính sách bảo mật
                </div>
                <div className='about-us info'>
                    <div className='title-body'>
                        Chúng tôi là ai
                    </div>
                    <div>
                        Địa chỉ website là: https://shop.mixigaming.com.
                    </div>
                </div>
                <div className='personal info'>
                    <div className='title-body'>
                        Thông tin cá nhân nào bị thu thập và tại sao thu thập
                    </div>
                    <div>
                        Trong phần này, bạn nên lưu ý dữ liệu cá nhân nào bạn thu thập từ người dùng và khách truy cập. Chúng có thể bao gồm dữ liệu cá nhân, như tên, địa chỉ email, tùy chọn tài khoản cá nhân; dữ liệu giao dịch, như thông tin mua hàng; và dữ liệu kỹ thuật, như thông tin về cookie.
                    </div>
                    <div>
                        Bạn cũng nên lưu ý các bộ sưu tập và lưu giữ dữ liệu cá nhân nhạy cảm, chẳng hạn như dữ liệu liên quan đến sức khỏe.
                    </div>
                    <div>
                        Ngoài việc liệt kê dữ liệu cá nhân nào bạn thu thập, bạn cần lưu ý lý do bạn thu thập dữ liệu đó. Những giải thích này là cơ sở pháp lý cho việc thu thập và lưu giữ dữ liệu của bạn hoặc sự đồng ý hoạt động mà người dùng đã đưa ra.
                    </div>
                    <div>
                        Dữ liệu cá nhân không chỉ được tạo bởi tương tác của người dùng với trang web của bạn. Dữ liệu cá nhân cũng được tạo ra từ các quy trình kỹ thuật như biểu mẫu liên hệ, bình luận, cookie, phân tích và nhúng của bên thứ ba.
                    </div>
                    <div>
                        Theo mặc định, chúng tôi không thu thập bất kỳ dữ liệu cá nhân nào về khách truy cập và chỉ thu thập dữ liệu được hiển thị trên màn hình Hồ sơ người dùng từ người dùng đã đăng ký. Tuy nhiên, một số gói mở rộng của bạn có thể thu thập dữ liệu cá nhân. Bạn nên thêm thông tin liên quan bên dưới.
                    </div>
                </div>
                <div className='personal info'>
                    <div className='title-body'>
                        Bình luận
                    </div>
                    <div>
                        Trong phần con này bạn nên lưu ý thông tin nào được thu thập qua các bình luận. Chúng tôi đã lưu ý về dữ liệu mà chúng tôi thu thập theo mặc định.
                    </div>
                    <div>
                        Văn bản được đề xuất: Khi khách truy cập để lại bình luận trên trang web, chúng tôi thu thập dữ liệu được hiển thị trong biểu mẫu bình luận và cũng là địa chỉ IP của người truy cập và chuỗi user agent của người dùng trình duyệt để giúp phát hiện spam
                    </div>
                    <div>
                        Một chuỗi ẩn danh được tạo từ địa chỉ email của bạn (còn được gọi là hash) có thể được cung cấp cho dịch vụ Gravatar để xem bạn có đang sử dụng nó hay không. Chính sách bảo mật của dịch vụ Gravatar có tại đây: https://automattic.com/privacy/. Sau khi chấp nhận bình luận của bạn, ảnh tiểu sử của bạn được hiển thị công khai trong ngữ cảnh bình luận của bạn.
                    </div>
                </div>
                <div className='personal info'>
                    <div className='title-body'>
                        Cookies
                    </div>
                    <div>
                        Trong mục này bạn nên liệt kê các cookie website bạn sử dụng, bao gồm các cookie của plugin, mạng xã hội và các công cụ thống kê. Chúng tôi đã cung cấp sẵn các cookie mà chúng tôi mặc định có.
                    </div>
                    <div>
                        Văn bản được đề xuất: Nếu bạn viết bình luận trong website, bạn có thể cung cấp cần nhập tên, email địa chỉ website trong cookie. Các thông tin này nhằm giúp bạn không cần nhập thông tin nhiều lần khi viết bình luận khác. Cookie này sẽ được lưu giữ trong một năm.
                    </div>
                    <div>
                        Nếu bạn vào trang đăng nhập, chúng tôi sẽ thiết lập một cookie tạm thời để xác định nếu trình duyệt cho phép sử dụng cookie. Cookie này không bao gồm thông tin cá nhân và sẽ được gỡ bỏ khi bạn đóng trình duyệt.                    
                    </div>
                    <div>
                        Khi bạn đăng nhập, chúng tôi sẽ thiết lập một vài cookie để lưu thông tin đăng nhập và lựa chọn hiển thị. Thông tin đăng nhập gần nhất lưu trong hai ngày, và lựa chọn hiển thị gần nhất lưu trong một năm. Nếu bạn chọn “Nhớ tôi”, thông tin đăng nhập sẽ được lưu trong hai tuần. Nếu bạn thoát tài khoản, thông tin cookie đăng nhập sẽ bị xoá.
                    </div>
                    <div>
                        Nếu bạn sửa hoặc công bố bài viết, một bản cookie bổ sung sẽ được lưu trong trình duyệt. Cookie này không chứa thông tin cá nhân và chỉ đơn giản bao gồm ID của bài viết bạn đã sửa. Nó tự động hết hạn sau 1 ngày.
                    </div>
                </div>
                <div className='personal info'>
                    <div className='title-body'>
                        Dữ liệu của bạn tồn tại bao lâu
                    </div>
                    <div>
                        Trong phần này, bạn nên giải thích thời gian bạn giữ lại dữ liệu cá nhân được thu thập hoặc xử lý bởi trang web. Mặc dù bạn có trách nhiệm đưa ra thời gian về việc bạn lưu giữ mỗi tập dữ liệu trong bao lâu và tại sao bạn giữ nó, thông tin đó cần phải được liệt kê ở đây. Ví dụ: bạn có thể nói rằng bạn giữ các mẫu liên hệ trong sáu tháng, các bản ghi phân tích trong một năm và các bản ghi mua hàng của khách hàng trong mười năm.                    </div>
                    <div>
                        Văn bản được đề xuất: Nếu bạn để lại bình luận, bình luận và siêu dữ liệu của nó sẽ được giữ lại vô thời hạn. Điều này là để chúng tôi có thể tự động nhận ra và chấp nhận bất kỳ bình luận nào thay vì giữ chúng trong khu vực đợi kiểm duyệt.                    
                    </div>
                    <div>
                        Đối với người dùng đăng ký trên trang web của chúng tôi (nếu có), chúng tôi cũng lưu trữ thông tin cá nhân mà họ cung cấp trong hồ sơ người dùng của họ. Tất cả người dùng có thể xem, chỉnh sửa hoặc xóa thông tin cá nhân của họ bất kỳ lúc nào (ngoại trừ họ không thể thay đổi tên người dùng của họ). Quản trị viên trang web cũng có thể xem và chỉnh sửa thông tin đó.                    </div>
                    <div>
                        Khi bạn đăng nhập, chúng tôi sẽ thiết lập một vài cookie để lưu thông tin đăng nhập và lựa chọn hiển thị. Thông tin đăng nhập gần nhất lưu trong hai ngày, và lựa chọn hiển thị gần nhất lưu trong một năm. Nếu bạn chọn “Nhớ tôi”, thông tin đăng nhập sẽ được lưu trong hai tuần. Nếu bạn thoát tài khoản, thông tin cookie đăng nhập sẽ bị xoá.
                    </div>
                    <div>
                        Nếu bạn sửa hoặc công bố bài viết, một bản cookie bổ sung sẽ được lưu trong trình duyệt. Cookie này không chứa thông tin cá nhân và chỉ đơn giản bao gồm ID của bài viết bạn đã sửa. Nó tự động hết hạn sau 1 ngày.
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Security)));
