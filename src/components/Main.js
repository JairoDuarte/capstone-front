import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'  
import io from 'socket.io-client'
import HeaderHome from './home/Header';
import Footer from './Footer';
import Home from './home/Home';
import Dashboard from './customer/Dashboard';
import RiderDashBoard from './rider/Dashboard';
import HeaderCustomer from './customer/Header';
import {connect} from 'react-redux';
import { baseUrl } from '../services/baseUrl';
import {signout} from '../actions/auth'
import { acceptSkheraService, declineSkheraService } from '../actions/skhera';
import { updateUserStatus } from '../actions/user'

const socket = io.connect(baseUrl);
export const CUSTOMER_ROLE = 'consumer';
export const COURSIER_ROLE = 'rider';


const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    notifications: state.skhera.notifications,
    errMess: state.auth.errMess,
  }
}
const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout()),
  declineSkheraService: (skhera) => dispatch(declineSkheraService(skhera)),
  acceptSkheraService: (skhera) => dispatch(acceptSkheraService(skhera)),
  updateUserStatus: (status) => dispatch(updateUserStatus(status)) 
});

class Main extends Component {

  render() {
    
    const HomePage = () => {
      return (
        <Home></Home>
      )
    };
    const Header = () => {
      
      return this.props.isAuthenticated ? (
        <HeaderCustomer 
        errMess={this.props.errMess}
        updateUserStatus={this.props.updateUserStatus}
        acceptSkheraService={this.props.acceptSkheraService}
        declineSkheraService={this.props.declineSkheraService}
        notifications={this.props.notifications} 
        signout={this.props.signout}
        user={this.props.user}/>
      ) :
      <HeaderHome 
      errMess={this.props.errMess} socket={socket}></HeaderHome>
    };
    const PrivateRoute = ({ component: Component, roles, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.isAuthenticated && !!~roles.indexOf(this.props.user.role)
          ? <Component socket={socket} {...props} />
          : <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} />
      )} />)
      const LoginRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          !this.props.isAuthenticated 
            ? <Component {...props} />
            : this.props.user.role ===  CUSTOMER_ROLE ? 
              <Redirect to={{ pathname: '/profile/3', state: { from: props.location }}} />
              : <Redirect to={{ pathname: '/dashboard/profile/3', state: { from: props.location }}} />

        )} />)

    return (
      <div>
        <Header />
        <Switch>
          <LoginRoute exact path="/home" component={HomePage} />
          <Route exact  path='/about' component={()=> <h1>about</h1>} />
          <Route path='/terms' component={()=> <h1>Terms</h1>} />
          <PrivateRoute exact path='/profile/:columns' roles={[CUSTOMER_ROLE]} component={Dashboard} />
          <PrivateRoute path='/profile/:columns/:page' roles={[CUSTOMER_ROLE]} component={Dashboard} />
          <PrivateRoute path='/skhera/:columns/:page' roles={[CUSTOMER_ROLE]}  component={Dashboard} />

          <PrivateRoute exact path='/dashboard/:page/:columns' roles={[COURSIER_ROLE]} component={RiderDashBoard} />
          <PrivateRoute path='/dashboard/:page/:columns/' roles={[COURSIER_ROLE]} component={RiderDashBoard} />
          <PrivateRoute path='/dashboard/:page/:columns/' roles={[COURSIER_ROLE]}  component={RiderDashBoard} />
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));