import React, { Component } from 'react';
import { Button, Container, Image, Menu, Responsive, Segment, Visibility} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {signin} from '../../actions/auth';
import HomepageHeading from './LoginHeading';

// TODO delete comments 
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */

const getWidth = () => {
  return window.innerWidth
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {

    return (
      <Responsive
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Segment
          inverted
          textAlign='center'
          style={{ minHeight: '640px', width: '100%',backgroundPosition: '50% 25%', padding: '0em 0em', backgroundImage: `url('assets/images/jibleecover.png')` }}
          vertical
        >
          <Container>
            <Menu inverted pointing secondary size='large'>
              <Menu.Item> <img alt='logo' style={{ height: '33px', width: '73px' }} src='/assets/images/Logo_Jible White.png' /> </Menu.Item>
            </Menu>
          </Container>

          <HomepageHeading mobile signin={this.props.signin} socket={this.props.socket} ></HomepageHeading>
        </Segment>

      </Responsive>
    )
  }
}


class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em', backgroundImage: `url('assets/images/jibleecover.png')` }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}

              secondary
              borderless={false}
              size='large'
            >
              <Container>
                <Menu.Item> <Image href="/" alt='logo' style={{ height: '44.85px', width: '91.41px' }} src='/assets/images/Logo_Jible White.png' /> </Menu.Item>
                <Menu.Item position='right'>
                  <Button onClick={() => {alert('hello')}}  color='grs' style={{ fontFamily: 'Ropa Sans', padding: '14px 50px' }}>
                    &nbsp;Signup&nbsp;
                    </Button>
                  <Button color='grl' primary={false} as='a' style={{ fontFamily: 'Ropa Sans', marginLeft: '2.5em', padding: '14px 50px' }}>
                    &nbsp;Login&nbsp;
                    </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading signin={this.props.signin} socket={this.props.socket} ></HomepageHeading>
          </Segment>
        </Visibility>
      </Responsive>
    )
  }
}
// TODO Responsive menu 

const mapDispatchToProps = dispatch => ({
  signin: (user) => dispatch(signin(user))

});

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

class HeaderComponent extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    return (
      <div>
        <DesktopContainer signin={this.props.signin} socket={this.props.socket} ></DesktopContainer>
        <MobileContainer signin={this.props.signin} socket={this.props.socket}></MobileContainer>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));
