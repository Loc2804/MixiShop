import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './BrandMixi.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import {getAllImg} from '../../../services/userService'

class BrandMixi extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    async componentDidMount(){

    }
    render() {
        
        return (
            <>
                <div className='container mt-5'>
                    <div className='title-popular-brand'>
                        Đồ hiệu mixi
                    </div>
                    <div className='brand-container '>
                        <div className='brand-item'>
                            <div className='brand-img spr-sum'>
                            </div>
                            <div className='brand-title'>
                                Đồ xuân hè
                            </div>
                        </div>
                        <div className='brand-item'>
                            <div className='brand-img aut-win'>
                            </div>
                            <div className='brand-title'>
                                Đồ thu đông
                            </div>
                        </div>
                        <div className='brand-item'>
                            <div className='brand-img cup'>
                            </div>
                            <div className='brand-title'>
                                Cốc bình
                            </div>
                        </div>
                        <div className='brand-item'>
                            <div className='brand-img lego'>
                            </div>
                            <div className='brand-title'>
                                Lego
                            </div>
                        </div>
                        <div className='brand-item'>
                            <div className='brand-img shoe'>
                            </div>
                            <div className='brand-title'>
                                Giày dép
                            </div>
                        </div>
                        <div className='brand-item'>
                            <div className='brand-img sou'>
                            </div>
                            <div className='brand-title'>
                                Đồ lưu niệm
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandMixi);
