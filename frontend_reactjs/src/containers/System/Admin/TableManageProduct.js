import React, { Component } from 'react';
import { FormattedMessage,injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageProduct.scss'
import * as actions from "../../../store/actions";
// import { getAllUsers } from '../../services/userService';
// import ModalUser from './ModalUser';
import { deleteProduct} from '../../../services/userService';
// import { emitter } from '../../utils/emitter';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';


class TableManageProduct extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            arrProduct : [],
            currentPage:0,
            productPerPage:5,
        }
    }

    componentDidMount(){
        
        this.setState({
            arrProduct: this.props.listProduct,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.listProduct !== this.props.listProduct)
        {
            this.setState({
                arrProduct: this.props.listProduct,
            })
        }
    }
    handleDeleteProduct = async(item)=>{
        let res = await deleteProduct(item.id); 
        if(res && res.errCode === 0){
            toast.success('Delete product ' + item.nameProduct + ' success');
        }
        else
            toast.error(res.message);
    }
    handleEditProduct = (item) =>{
        this.props.editProduct(item);
    }

    handlePageClick = (data) => {
        const selectedPage = data.selected;
        this.setState({ currentPage: selectedPage });
    };
    render() {
        console.log('check', this.props.listProduct);
        let arrProduct = this.state.arrProduct || [];
        const { currentPage, productPerPage } = this.state;
        const offset = currentPage * productPerPage;
        const currentProduct = arrProduct.slice(offset, offset + productPerPage);
        const pageCount = Math.ceil(arrProduct.length / productPerPage);
        return (
            <>
                <div className='users-table my-4'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Mã </th>
                                <th>Tên </th>
                                <th>Số lượng</th>
                                <th>Mẫu</th>
                                <th>Size</th>
                                <th>Giá</th>
                                <th>Thích</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            currentProduct && currentProduct.map((item,index) =>{
                                return( 
                                    <tr key={index}>  
                                        <td>{item.productId}</td>
                                        <td>{item.nameProduct}</td>
                                        <td>{item.number}</td>
                                        <td>{item.typeData.valueType}</td>
                                        <td>{item.sizeData.valueSize}</td>
                                        <td>{item.priceData.valuePrice}</td>
                                        <td>{item.isLove === 1 ? 'Có' : 'Không'}</td>
                                        <td>
                                            <button className="btn-edit"
                                                onClick={()=> this.handleEditProduct(item)}>
                                                <i className="fas fa-pencil-alt btn-edit"></i>
                                            </button>
                                            <button className="btn-delete"
                                                onClick={()=> this.handleDeleteProduct(item)}>
                                                <i className="fas fa-trash btn-delete"></i>
                                            </button>
                                        </td> 
                                    </tr>
                                 )
                            })
                        } 
                        </tbody>
                    </table>
                    <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="Prev"
                            renderOnZeroPageCount={null}
                            containerClassName={"pagination"}
                            activeClassName={"active"}
                        />
                </div>
                
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TableManageProduct));
