import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES,CRUD_ACTIONS, CommonUtils} from '../../../utils';
import * as actions from "../../../store/actions";
import './ManageProduct.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { getAllService, createProduct, editProduct, getProduct } from '../../../services/userService';
import { Buffer } from 'buffer';
import TableManageProduct from './TableManageProduct'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageProduct extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            id:'',
            productId:'',
            nameProduct:'',
            detailHTML:'',
            detailMarkdown:'',
            number:'',
            typeId:'',
            priceId:'',
            sizeId:'',
            discount:'',
            img:'',
            isLove:'',
            action : CRUD_ACTIONS.CREATE,
            previewImgURL: '',
            isOpen: false,

            priceArr:[],
            sizeArr:[],
            typeArr:[],
            listProduct:[],
        }
    }

    async componentDidMount() {
        let res_price = await getAllService('price');
        let res_type = await getAllService('type');
        let res_size = await getAllService('size');
        this.props.getProduct();
        if(res_price && res_size && res_type && res_price.errCode === 0 && res_size.errCode === 0 && res_type.errCode === 0){
            this.setState({
                priceArr:res_price.data,
                sizeArr:res_size.data,
                typeArr:res_type.data,
            })
        }
    }

    //always run -> nên luôn phải có điều kiện kiểm tra sự thay đổi
    async componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(this.props.listProduct !== prevProps.listProduct){
            this.setState({
                listProduct: this.props.listProduct,
            })
        }
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

    openPrivewImage = () =>{
        if(!this.state.previewImgURL) return;

        this.setState({
            isOpen:true,
        })
    }

    handleOnChangeInput = (event,id) =>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        })
    }
    checkValidateInput = () =>{
        let isValid = true;
        let arrInput =['productId', 'nameProduct', 'detailHTML','detailMarkdown', 'number','typeId', 'sizeId','img'];
        for(let i=0; i<arrInput.length; i++)
        {
            if(!this.state[arrInput[i]]) //this.state['email'] === this.state.email
            {
                isValid = false;
                toast.error('You should fill this field before save: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveProduct = async() =>{
        let {action} = this.state; // let action = this.state.action
        if(action === CRUD_ACTIONS.CREATE)
        {
            //fire redux create
            if(this.checkValidateInput())
                {
                    let res = await createProduct({
                        productId:this.state.productId,
                        nameProduct:this.state.nameProduct,
                        detailHTML:this.state.detailHTML,
                        detailMarkdown:this.state.detailMarkdown,
                        number:this.state.number,
                        typeId:this.state.typeId,
                        priceId:this.state.priceId,
                        sizeId:this.state.sizeId,
                        discount:this.state.discount,
                        isLove:this.state.isLove,
                        img:this.state.img,
                    });
                    if(res && res.errCode === 0){
                        toast.success(res.message);
                        this.clearAllForm();
                    }
                    else
                        toast.error(res.message);
                    
                }
            else return;
        }
        if(action === CRUD_ACTIONS.EDIT)
        {
            //fire redux edit
            if(this.checkValidateInput())
            {
                let res = await editProduct({
                        id:this.state.id,
                        productId:this.state.productId,
                        nameProduct:this.state.nameProduct,
                        detailHTML:this.state.detailHTML,
                        detailMarkdown:this.state.detailMarkdown,
                        number:this.state.number,
                        typeId:this.state.typeId,
                        priceId:this.state.priceId,
                        sizeId:this.state.sizeId,
                        discount:this.state.discount,
                        isLove:this.state.isLove,
                        img:this.state.img,
                })
                if(res && res.errCode === 0){
                    toast.success(res.message);
                    this.clearAllForm();
                }
                else
                    toast.error(res.message);
            }
        }
    }
    handleEditProduct = (item)=>{
        this.setState({
            id:item.id,
            productId:item.productId,
            nameProduct:item.nameProduct,
            detailHTML:item.detailHTML,
            detailMarkdown:item.detailMarkdown,
            number:item.number,
            typeId:item.typeId,
            priceId:item.priceId,
            sizeId:item.sizeId,
            discount:item.discount,
            isLove:item.isLove === 0 ? false: true,

            img:item.img,
            action: CRUD_ACTIONS.EDIT,
            previewImgURL: item.img,
            isOpen: false,
        });
        
    }

    clearAllForm = () =>{
        this.setState({
            productId:'',
            nameProduct:'',
            detailHTML:'',
            detailMarkdown:'',
            number:'',
            typeId:'',
            priceId:'',
            sizeId:'',
            discount:'',
            img:'',
            isLove:'',
            action : CRUD_ACTIONS.CREATE,
            previewImgURL: '',
            isOpen: false,
            isShowPassword : false,
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            detailHTML: html,
            detailMarkdown:text,
        });
    }
    render() {
        let {productId, nameProduct, number,  typeId, priceId,sizeId,discount,isLove, priceArr,sizeArr,typeArr} = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    QUẢN LÍ SẢN PHẨM
                </div>
                
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>Thêm mới sản phẩm</div>
                            <div className='col-6 '>
                                <label htmlFor="">Mã sản phẩm</label>
                                <input type="text" className='form-control' 
                                    value={ productId}
                                    onChange={(event) => {this.handleOnChangeInput(event,"productId")}}
                                />
                            </div>
                            <div className='col-6  form-group'>
                                <label htmlFor="">Tên sản phẩm</label>
                                <div className='custom-input-password'>
                                    <input type='text'
                                        className='form-control'  
                                        value={ nameProduct}
                                        onChange={(event) => {this.handleOnChangeInput(event,"nameProduct")}}
                                    />
                                </div>
                            </div>         
                            <div className='col-6'>
                                <label htmlFor="">Số lượng sản phẩm</label>
                                <input type="text" className='form-control' 
                                    value={number}
                                    onChange={(event) => {this.handleOnChangeInput(event,"number")}}/>
                            </div>
                            <div className='col-6'>
                                <label htmlFor="">Mức giảm giá</label>
                                <input type="text" className='form-control' 
                                    value={discount}
                                     onChange={(event) => {this.handleOnChangeInput(event,"discount")}}/>
                            </div>

                            <div className='col-6'>
                                <label htmlFor="">Được yêu thích</label>
                                <select name="" className='form-control'
                                    value={isLove} 
                                    onChange={(event) => {this.handleOnChangeInput(event,'isLove')}}>
                                    <option disabled selected hidden value="">Choose...</option>
                                    <option value="true">Có</option>
                                    <option value="false">Không</option>
                                </select>
                            </div>
                            <div className='col-6'>
                                <label htmlFor="">Hình ảnh</label>
                                <div className='preview-img-container'>
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
                            <div className='col-4'>
                                <label htmlFor="">Size</label>
                                <select name="" className='form-control'
                                    value={sizeId} 
                                    onChange={(event) => {this.handleOnChangeInput(event,'sizeId')}}>
                                    <option disabled selected hidden value="">Choose...</option>
                                    {sizeArr && sizeArr.length >0 
                                        && sizeArr.map((item,index) =>{
                                            return(
                                                <option value={item.sizeId} key={index}>{item.valueSize}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="">Mẫu</label>
                                <select name="" className='form-control'
                                    value={typeId} 
                                    onChange={(event) => {this.handleOnChangeInput(event,'typeId')}}>
                                    <option disabled selected hidden value="">Choose...</option>
                                    {typeArr && typeArr.length >0 
                                        && typeArr.map((item,index) =>{
                                            return(
                                                <option value={item.typeId} key={index}>{item.valueType}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-4'>
                                <label htmlFor="">Giá</label>
                                <select name="" className='form-control'
                                    value={priceId} 
                                    onChange={(event) => {this.handleOnChangeInput(event,'priceId')}}>
                                    <option disabled selected hidden value="">Choose...</option>
                                    {priceArr && priceArr.length >0 
                                        && priceArr.map((item,index) =>{
                                            return(
                                                <option value={item.priceId} key={index}>{item.valuePrice}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-12 mt-3'>
                            <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} 
                                // truyền props xuống thằng con nên ko cần arrow function đối với event onChange
                                onChange={this.handleEditorChange} 
                                value={this.state.detailMarkdown}
                            />
                            </div>
                               
                            
                            <div className='col-12 mt-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => {this.handleSaveProduct()}}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ?'Lưu thông tin' : 'Thêm mới sản phẩm'}       
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageProduct 
                                    editProduct = {this.handleEditProduct}
                                    saveProduct = {this.handleSaveProduct}
                                    listProduct = {this.state.listProduct}
                                />
                            </div>       
                        </div>             
                    </div>
                </div>           
                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}           
                    />
                }
            </div>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listProduct: state.admin.listProduct,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct : () => dispatch(actions.getAllProduct()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
