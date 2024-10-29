import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as actions from "../../../store/actions";
import './ManageSlide.scss';
import { FormattedMessage } from 'react-intl';
import {CRUD_ACTIONS, LANGUAGES} from  '../../../utils';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';
import Lightbox from 'react-image-lightbox';
import {CommonUtils} from '../../../utils';
import { createNewImg, getAllImg , editImg, deleteImg} from '../../../services/userService';

class ManageSlide extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            slide :[],
            nameImg:'',
            img:'',
            previewImgURL: '',
            isOpen: false,
            action: CRUD_ACTIONS.CREATE,
            idImg:'',
        }
    }
    
    loadSlide = async () =>{
        let res = await getAllImg();
        if(res && res.errCode === 0){
            this.setState({
                slide: res.data,
            })
        }
    }
    async componentDidMount() {
        let res = await getAllImg();
        if(res && res.errCode === 0){
            this.setState({
                slide: res.data,
            })
        }
    }
    
    async componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadSlide();
    }
    openPrivewImage = () =>{
        if(!this.state.previewImgURL) return;

        this.setState({
            isOpen:true,
        })
    }
    handleOnChangImage = async(event) =>{
        let data = event.target.files;
        let file = data[0];
        if(file)
        {
            let base64 = await CommonUtils.getBase64(file);
            const objectURL = URL.createObjectURL(file); //api của html -> tạo url xem ảnh trên gg
            this.setState({
                previewImgURL: objectURL,
                img: base64,
            })
        }
    }
    handleOnChangeName = (event) =>{
        this.setState({
            nameImg: event.target.value,
        })
    }

    clearForm = () =>{
        this.setState({
            nameImg:'',
            img:'',
            previewImgURL: '',
        })
    }
    handleSaveImg = async() =>{
        if(this.state.action === CRUD_ACTIONS.CREATE)
        {
            let res = await createNewImg({
                name: this.state.nameImg,
                img : this.state.img,
            })
            if(res && res.errCode === 0)
            {
                toast.success(res.message);
                this.clearForm();
            }
            else 
                toast.error(res.message);
        }
        if(this.state.action === CRUD_ACTIONS.EDIT){
            let res = await editImg({
                img : this.state.img,
                name: this.state.nameImg,
                id : this.state.idImg,
            })
            if(res && res.errCode === 0){
                toast.success(res.message);
                this.clearForm();
            }
            else
                toast.error(res.message);
        }
        
    }

    handleEditImg = async(item) =>{
        this.setState({
            img: item.slideImg,
            nameImg: item.nameImg,
            previewImgURL: item.slideImg,
            action: CRUD_ACTIONS.EDIT,
            idImg:item.id,
        })
        
    }

    handleDeleteImg = async(item) =>{
        let res = await deleteImg(item.id);
        if(res && res.errCode === 0){
            toast.success(res.message);
        }
        else
            toast.error(res.message);
    }
    render() {     
        let {userInfo, language} = this.props;
        let {slide } = this.state;
        return (
            <Fragment> 
                <div className='title'>
                    QUẢN LÝ SLIDE HÌNH ẢNH
                </div>

                <div className='container mange-slide-container'>
                    <div className='row'>
                        <div className='col-7 form-group'>
                            <label htmlFor="">Tên hình ảnh</label>
                            <input type="text" className='form-control' value={this.state.nameImg} onChange={(event) => this.handleOnChangeName(event)}/>
                        </div>
                    

                        <div className='col-7'>
                            <label htmlFor="">Hình ảnh</label>
                            <div className='preview-img'>
                                <input type="file" id="previewImg" hidden
                                    onChange={(event) => {this.handleOnChangImage(event)}}    
                                />
                                <label htmlFor="previewImg" className='label-upload'>Tải ảnh <i className="fas fa-upload"></i></label>
                                <div className='preview-image' style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                    onClick={() => {this.openPrivewImage()}}
                                >  
                                </div>
                            </div>
                        </div>
                        <div className='col-12 mt-3'>
                            <button className={this.state.action === CRUD_ACTIONS.CREATE?'btn btn-primary':'btn btn-warning'} onClick={() => this.handleSaveImg()}>
                            {this.state.action === CRUD_ACTIONS.CREATE?'Thêm mới':'Thay đổi'}
                            </button>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <div className='users-table my-4 col-12'>
                        <table id="customers">
                            <thead>
                                <tr>
                                    <th>Tên ảnh</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                slide && slide.map((item,index) =>{
                                    return( 
                                        <tr key={index}>  
                                            <td>{item.nameImg}</td>

                                            <td>
                                                <button className="btn-edit"
                                                    onClick={()=> this.handleEditImg(item)}>
                                                    <i className="fas fa-pencil-alt btn-edit"></i>
                                                </button>
                                                <button className="btn-delete"
                                                    onClick={()=> this.handleDeleteImg(item)}>
                                                    <i className="fas fa-trash btn-delete"></i>
                                                </button>
                                            </td> 
                                        </tr>
                                    )
                                })
                            } 
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}     
                    />
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language : state.app.language,
        userInfo : state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOut : () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSlide);
