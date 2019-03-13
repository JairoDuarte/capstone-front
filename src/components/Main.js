import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'  
import io from 'socket.io-client'
import HeaderHome from './home/Header';
import Footer from './Footer';
import Home from './home/Home';
import Dashboard from './customer/Dashboard';
import HeaderCustomer from './customer/Header';
import {connect} from 'react-redux';
import { baseUrl } from '../services/baseUrl';
const socket = io.connect(baseUrl)


const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
  }
}

class Main extends Component {

  render() {
    
    const HomePage = () => {
      return (
        <Home></Home>
      )
    };
    const Header = () => {
      
      return this.props.isAuthenticated ? (
        <HeaderCustomer></HeaderCustomer>
      ) :
      <HeaderHome socket={socket}></HeaderHome>
    };
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} />
      )} />)
      const LoginRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
          this.props.isAuthenticated === false
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/profile/3',
                state: { from: props.location }
              }} />
        )} />)

    return (
      <div>
        <Header socket={socket}/>
        <Switch>
          <LoginRoute exact path="/home" component={HomePage} />
          <Route exact  path='/about' component={()=> <h1>about</h1>} />
          <PrivateRoute path='/terms' component={()=> <h1>Terms</h1>} />
          <PrivateRoute exact path='/profile/:columns' component={Dashboard} />
          <PrivateRoute path='/profile/:columns/:page' component={Dashboard} />
          <PrivateRoute path='/skhera/:columns/:page' component={Dashboard} />
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));