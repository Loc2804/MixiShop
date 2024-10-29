import React, { Component } from 'react';
import { FormattedMessage,injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from "../../../store/actions";
// import { getAllUsers } from '../../services/userService';
// import ModalUser from './ModalUser';
// import { createNewUserService, deleteUserService, editUserService } from '../../services/userService';
// import { emitter } from '../../utils/emitter';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import ReactPaginate from 'react-paginate';
import {  deleteUserService} from '../../../services/userService';
import { toast } from 'react-toastify';


class TableManageUser extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            arrUsers : [],
            currentPage:0,
            usersPerPage:3,
        }
    }

    componentDidMount(){
        
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if(prevProps.listUsers !== this.props.listUsers)
        {
            this.setState({
                arrUsers : this.props.listUsers,
            })
        }
    }
    handleDeleteUser = async(item)=>{
        let res = await deleteUserService(item.id); 
        if(res && res.errCode === 0){
            toast.success('Delete user ' + item.fullName + ' success');
        }
    }
    handleEditUser = (user) =>{
        this.props.handleEditUserFromParent(user);
    }

    
    handlePageClick = (data) => {
        const selectedPage = data.selected;
        this.setState({ currentPage: selectedPage });
    };
    render() {
        
        let arrUsers = this.props.listUsers || [];
        
        const { currentPage, usersPerPage } = this.state;
        const offset = currentPage * usersPerPage;
        const currentUsers = arrUsers.slice(offset, offset + usersPerPage);
        const pageCount = Math.ceil(arrUsers.length / usersPerPage);
        return (
            <>
                <div className='users-table my-4'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Họ và tên</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            currentUsers && currentUsers.map((item,index) =>{
                                return( 
                                    <tr key={index}>  
                                        <td>{item.email}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>
                                            <button className="btn-edit"
                                                onClick={()=> this.handleEditUser(item)}>
                                                <i className="fas fa-pencil-alt btn-edit"></i>
                                            </button>
                                            <button className="btn-delete"
                                                onClick={()=> this.handleDeleteUser(item)}>
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
                            nextLabel="next >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TableManageUser));
