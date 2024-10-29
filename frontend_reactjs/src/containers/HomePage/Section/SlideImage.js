import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './SlideImage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import {getAllImg} from '../../../services/userService'

class SlideImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            slide : [],
        }
    }
    async componentDidMount(){
        let res = await getAllImg();
        if(res && res.errCode === 0){
            this.setState({
                slide: res.data,
            })
        }
    }
    render() {
        
        let {slide} = this.state;
        
        return (
            <>
                <div className='slide-content'>
                <Slider {...this.props.settings}>
                    {slide && slide.length > 0 
                        && slide.map((item, index) =>{
                            return(
                                // <div className='slide-img'>
                                //     <img src={item.slideImg} alt="" />
                                // </div>
                                <>
                                    <div key={index} className='slide-img' style={{backgroundImage: `url(${item.slideImg})`}}></div>
                                </>
                            )
                        })
                    }
                </Slider>
                </div>
                <div className='item-intro container'>
                    <div className='menu'>
                        <div className='logo-menu menu-ship'> </div>
                        <div className='name'>
                            <div className='label-content'>
                                Vận chuyển toàn quốc
                            </div>
                            <div className='detail-content'>
                                Vận chuyển toàn quốc
                            </div>
                        </div>
                    </div>
                    <div className='menu'>
                        <div className='logo-menu menu-dis'> </div>
                        <div className='name'>
                            <div className='label-content'>
                                Ưu đãi hấp dẫn
                            </div>
                            <div className='detail-content'>
                                Nhiều ưu đãi khuyến mãi hot
                            </div>
                        </div>
                    </div>
                    <div className='menu'>
                        <div className='logo-menu menu-qual'> </div>
                        <div className='name'>
                            <div className='label-content'>
                                Bảo đảm chất lượng
                            </div>
                            <div className='detail-content'>
                                Sản phẩm đã được kiểm định
                            </div>
                        </div>
                    </div>
                    <div className='menu'>
                        <div className='logo-menu menu-hotline'> </div>
                        <div className='name'>
                            <div className='label-content'>
                                Hotline: 0822221992
                            </div>
                            <div className='detail-content'>
                               Vui lòng gọi hotline để hỗ trợ
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideImage);
