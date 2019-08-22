import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import io from 'socket.io-client';
import HeaderHome from './home/Header';
import Footer from './Footer';
import Home from './home/Home';
import Dashboard from './customer/Dashboard';
import RiderDashBoard from './rider/Dashboard';
import HeaderCustomer from './customer/Header';
import { connect } from 'react-redux';
import { baseUrl } from '../services/baseUrl';
import { signout } from '../actions/auth';
import { acceptSkheraService, declineSkheraService } from '../actions/skhera';
import { updateUserStatus, setMenu } from '../actions/user';
import { askForPermissioToReceiveNotifications } from '../push-notification';

import { Responsive } from 'semantic-ui-react';

const socket = io.connect(baseUrl);
export const CUSTOMER_ROLE = 'consumer';
export const COURSIER_ROLE = 'rider';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};
const menus = [
  { label: 'My Skhera', url: '/skhera/2/list' },
  { label: 'My Profile', url: '/profile/3' },
  { label: 'My Address', url: '/profile/3/address' },
  { label: 'FAQ', url: '/profile/2/faq' }
];
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    notifications: state.skhera.notifications,
    errMess: state.auth.errMess,
    menuActive: state.user.menuActive
  };
};
const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(signout()),
  declineSkheraService: skhera => dispatch(declineSkheraService(skhera)),
  acceptSkheraService: skhera => dispatch(acceptSkheraService(skhera)),
  updateUserStatus: status => dispatch(updateUserStatus(status)),
  setMenu: menu => dispatch(setMenu(menu))
});

class Main extends Component {
  componentDidMount() {
    askForPermissioToReceiveNotifications();
  }

  render() {
    const HomePage = props => {
      return <Home {...props} />;
    };
    const Header = props => {
      return this.props.isAuthenticated ? (
        <HeaderCustomer
          {...props}
          errMess={this.props.errMess}
          updateUserStatus={this.props.updateUserStatus}
          acceptSkheraService={this.props.acceptSkheraService}
          declineSkheraService={this.props.declineSkheraService}
          notifications={this.props.notifications}
          signout={this.props.signout}
          user={this.props.user}
        />
      ) : (
        <HeaderHome errMess={this.props.errMess} socket={socket} />
      );
    };
    const PrivateRoute = ({ component: Component, roles, mobile = false, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.isAuthenticated && !!~roles.indexOf(this.props.user.role) ? (
            <Component setMenu={this.props.setMenu} mobile={mobile} socket={socket} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
    const LoginRoute = ({ component: Component, mobile = false, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          !this.props.isAuthenticated ? (
            <Component mobile={mobile} {...props} />
          ) : this.props.user.role === CUSTOMER_ROLE ? (
            <Redirect to={{ pathname: '/profile/3', state: { from: props.location } }} />
          ) : (
            <Redirect to={{ pathname: '/dashboard/profile/3', state: { from: props.location } }} />
          )
        }
      />
    );

    return (
      <div>
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Header getWidth={getWidth} />
          <Switch>
            <LoginRoute exact path="/home" component={HomePage} />
            <Route exact path="/about" component={() => <h1>about</h1>} />
            <Route path="/terms" component={() => <h1>Terms</h1>} />
            <PrivateRoute exact path="/profile/:columns" roles={[CUSTOMER_ROLE]} component={Dashboard} />
            <PrivateRoute path="/profile/:columns/:page" roles={[CUSTOMER_ROLE]} component={Dashboard} />
            <PrivateRoute path="/skhera/:columns/:page" roles={[CUSTOMER_ROLE]} component={Dashboard} />

            <PrivateRoute exact path="/dashboard/:page/:columns" roles={[COURSIER_ROLE]} component={RiderDashBoard} />
            <PrivateRoute path="/dashboard/:page/:columns/" roles={[COURSIER_ROLE]} component={RiderDashBoard} />
            <PrivateRoute path="/dashboard/:page/:columns/" roles={[COURSIER_ROLE]} component={RiderDashBoard} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </Responsive>
        <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
          <Header
            menuActive={this.props.menuActive}
            setMenu={this.props.setMenu}
            menus={menus}
            getWidth={getWidth}
            mobile
          />
          <Switch>
            <LoginRoute exact path="/home" component={HomePage} mobile />
            <Route mobile exact path="/about" component={() => <h1>about</h1>} />
            <Route mobile path="/terms" component={() => <h1>Terms</h1>} />
            <PrivateRoute mobile exact path="/profile/:columns" roles={[CUSTOMER_ROLE]} component={Dashboard} />
            <PrivateRoute mobile path="/profile/:columns/:page" roles={[CUSTOMER_ROLE]} component={Dashboard} />
            <PrivateRoute mobile path="/skhera/:columns/:page" roles={[CUSTOMER_ROLE]} component={Dashboard} />

            <PrivateRoute
              mobile
              exact
              path="/dashboard/:page/:columns"
              roles={[COURSIER_ROLE]}
              component={RiderDashBoard}
            />
            <PrivateRoute mobile path="/dashboard/:page/:columns/" roles={[COURSIER_ROLE]} component={RiderDashBoard} />
            <PrivateRoute mobile path="/dashboard/:page/:columns/" roles={[COURSIER_ROLE]} component={RiderDashBoard} />
            <Redirect to="/home" />
          </Switch>
          <Footer mobile />
        </Responsive>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
