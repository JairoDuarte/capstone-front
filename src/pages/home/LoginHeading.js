/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Header, Icon, Modal } from 'semantic-ui-react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import config from '../../config.json';
import baseUrl from '../../services/baseUrl';
import { CUSTOMER_ROLE, COURSIER_ROLE } from '../../constants';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false, disabled: '', role: CUSTOMER_ROLE };
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('facebook', user => {
      if (this.popup && !this.popup.closed) this.popup.close();
      this.props.signin(user);
    });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || (popup && (popup.closed === undefined || popup.closed))) {
        clearInterval(check);
        this.setState({ disabled: '' });
      }
    }, 1000);
  }

  openPopup = () => {
    const { socket } = this.props;
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${baseUrl}/api/auth/signup?socketId=${socket.id}&role=${this.state.role}`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
    );
  };

  startAuth = () => {
    this.setState({ open: false });
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: 'disabled' });
    }
  };

  closeConfigShow = role => () => {
    this.setState({ role, open: true });
  };

  close = () => this.setState({ open: false, role: '' });

  facebookResponse = response => {
    this.props.facebookResponse(response, this.state.role);
  };

  render() {
    const { mobile } = this.props;

    return (
      <Container textAlign="center" text>
        <Header
          as="h2"
          textAlign="center"
          content="An on demand service that picks-up anything you requested through the app and delivers it to your door within one hour."
          style={{
            marginLeft: mobile ? '1em' : '-1em',
            fontWeight: 'normal',
            height: mobile ? '120px' : '80px',
            width: mobile ? '90%' : '798px',
            color: '#FFFFFF',
            fontFamily: "'Ropa Sans', sans-serif",
            fontSize: mobile ? '23px' : '34px',
            lineHeight: '40px',
            marginTop: mobile ? '243px' : '12.5em'
          }}
        />
        <Button
          onClick={this.closeConfigShow(CUSTOMER_ROLE)}
          size="huge"
          color="grs"
          style={{
            marginTop: mobile ? '53px' : '',
            marginLeft: mobile ? '0em' : '1.0em',
            height: '55px',
            width: mobile ? '90%' : '300px'
          }}
        >
          <Icon name="home" />
          <span
            style={{
              height: '19px',
              width: '148px',
              color: '#FFFFFF',
              fontFamily: 'Ropa Sans',
              fontSize: '18px',
              lineheight: '19px'
            }}
          >
            Signup as a Consumer
          </span>
          <Icon name="right arrow" />
        </Button>
        {mobile ? (
          <div>
            <br />
          </div>
        ) : (
          ''
        )}
        <Button
          onClick={this.closeConfigShow(COURSIER_ROLE)}
          size="huge"
          color="grl"
          primary={false}
          as="a"
          style={{ marginLeft: mobile ? '0em' : '1.0em', height: '55px', width: mobile ? '90%' : '300px' }}
        >
          <Icon name="motorcycle" />
          <span
            style={{
              height: '19px',
              width: '148px',
              color: '#000000;',
              fontFamily: 'Ropa Sans',
              fontSize: '18px',
              lineheight: '19px'
            }}
          >
            Signup as a Rider
          </span>
          <Icon name="right arrow" />
        </Button>
        <Modal open={this.state.open} onClose={this.close} size="tiny" style={{ width: mobile ? '75%' : '' }}>
          <Modal.Content>
            <p style={{ marginTop: '3em' }}></p>
            <span
              style={{
                marginTop: '10em',
                marginLeft: mobile ? '0.5em' : '3em',
                height: '37px',
                width: '72px',
                fontSize: '34px'
              }}
            >
              Login
            </span>
            <p
              style={{
                color: '#909090',
                marginLeft: mobile ? '1em' : '6.4em',
                height: '17px',
                width: '157px',
                fontSize: '16px'
              }}
            >
              Welcome To Jible Services
            </p>
            <FacebookLogin
              appId={config.FACEBOOK_APP_ID}
              autoLoad={false}
              callback={this.facebookResponse}
              render={renderProps => (
                <Button
                  onClick={renderProps.onClick}
                  size="huge"
                  color="facebook"
                  primary={false}
                  as="a"
                  style={{ marginBottom: '2em', marginTop: '1em', marginLeft: mobile ? '1em' : '5em' }}
                >
                  <span
                    style={{
                      height: '19px',
                      width: '116px',
                      color: '#000000;',
                      fontFamily: 'Ropa Sans',
                      fontSize: '23px',
                      fontWeight: 'normal',
                      lineheight: '19px'
                    }}
                  >
                    Login with Facebook
                  </span>
                </Button>
              )}
            />
          </Modal.Content>
        </Modal>
      </Container>
    );
  }
}

Login.propTypes = {
  mobile: PropTypes.bool,
  signupConsumer: PropTypes.func,
  signupRider: PropTypes.func
};
