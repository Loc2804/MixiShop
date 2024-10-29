import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import SlideImage from './Section/SlideImage';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BrandMixi from './Section/BrandMixi';
import ProductShow from './Section/ProductShow';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    handleAfterChange = () =>{

    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 100,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
          };
        return (
            <div>
                <HomeHeader 
                    isShowBanner = {true}
                />
                <SlideImage settings= {settings}/>
                <BrandMixi/>
                <ProductShow
                />
                <HomeFooter/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        itemWhiteList: state.admin.itemWhiteList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
