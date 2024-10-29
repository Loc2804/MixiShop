import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';

import UserRedux from '../containers/System/Admin/UserRedux';
import HomeHeader from '../containers/HomePage/HomeHeader';
import HomeFooter from '../containers/HomePage/HomeFooter';

import HomePage from '../containers/HomePage/HomePage';
import UserInfo from '../containers/System/User/Info/UserInfo';


class System extends Component {
    render() {     
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <HomeHeader />} 
                <div className="system-container">
                    <div className="system-list">
                        <Switch>

                            <Route path="/account/info" component={UserInfo} /> 
                            
                        
                            <Route component={() => { return (<Redirect to={'/account/info'} />) }} />
                        </Switch>
                    </div>
                </div>
                <HomeFooter/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
