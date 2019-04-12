import React, { Component } from 'react';
import { Container, Menu, Header, Image, Button, Grid, Popup, Icon } from 'semantic-ui-react';
import { STATUS_ACTIF, STATUS_INACTIF, COURSIER_ROLE } from '../../constants'
import { Sidebar, Responsive, Segment, Visibility } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

let _this = {};

class MobileContainer extends Component {
    state = {}

    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })

    render() {

        return (
            <Responsive
                getWidth={window.innerWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                <Segment
                    inverted
                    textAlign='center'
                    style={{ minHeight: '640px', width: '100%', backgroundPosition: '50% 25%', padding: '0em 0em', backgroundImage: `url('assets/images/jibleecover.png')` }}
                    vertical
                >
                    <Container>
                        <Menu inverted pointing secondary size='large'>
                            <Menu.Item> <img alt='logo' style={{ height: '33px', width: '73px' }} src='/assets/images/Logo_Jible White.png' /> </Menu.Item>
                        </Menu>
                    </Container>

                </Segment>

            </Responsive>
        )
    }
}




export default class HeaderComponent extends Component {
    state = { open: false, min: 0, sec: 0, latitude: 0, longitude: 0 }

    componentDidMount() {
        _this = this;
        this.interval = setInterval(() => this.notifications(), 5000);
    }
    notifications = () => {
        if (_this.props.notifications.length > 0 && !_this.state.open) {
            let time = new Date().getTime() - _this.props.notifications[0].date;
            if (time > 60000) {
                this.props.declineSkheraService(_this.props.notifications[0]);
            }
            else {
                let min = 0;
                let sec = 60
                this.setState({ min: min, sec: sec, open: true });
                this.handleTimer = setInterval(() => this.timer(time), 1000);
            }

        } else if (this.state.min === 0 && this.state.sec === 0) {
            if (this.handleTimer) {
                clearInterval(this.handleTimer);
            }
            this.setState({ min: 0, sec: 60, open: false });
        }
    }
    timer = () => {
        if (this.state.sec > 0) {
            this.setState({ sec: this.state.sec - 1 })
        }
        else {
            this.setState({ sec: 0, min: 0 })
        }
    }
    handleSidebarHide = () => this.setState({ sidebarOpened: false })

    handleToggle = () => this.setState({ sidebarOpened: true })
    setcolor = name => {
        return name === this.props.menuActive ? 'pink' : 'grs';
    }

    render() {
        let color = this.props.notifications && this.props.notifications.length === 0 ? '' : 'green';
        let name = this.props.notifications && this.props.notifications.length === 0 ? 'bell outline' : 'bell';
        const RenderStatus = () => {
            return (this.props.user.status === STATUS_ACTIF ?
                <Popup on='click' content={<Button onClick={() => this.props.updateUserStatus(STATUS_INACTIF)} color='grs'
                    content='Inactif' fluid />} trigger={<Icon as='i' size='large' color='green'
                        name='bell' />} wide>
                </Popup> :
                <Popup on='click' content={<Button onClick={() => this.props.updateUserStatus(STATUS_ACTIF)} color='grs'
                    content='Actif' fluid />} trigger={<Icon as='i' size='large'
                        name='bell outline' />} wide>
                </Popup>
            )
        }
        const RenderNotification = () => {
            let skhera = this.state.open ? this.props.notifications[0] : null;
            return (this.state.open ?
                <>
                    <Popup trigger={<Icon as='i' size='large' color={color} name={name} />} wide open={this.state.open}>
                        <Header>{`${this.state.min}:${this.state.sec}min`}</Header>
                        <Grid divided columns='equal'>
                            <Grid.Column>
                                <Popup
                                    trigger={<Button onClick={() => this.props.acceptSkheraService(skhera)} color='grs' content='Accepte' fluid />}
                                    content={skhera.description}
                                    position='top center'
                                    size='tiny'
                                    inverted
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Popup
                                    trigger={<Button onClick={() => this.props.declineSkheraService(skhera)} color='grl' content='Decline' fluid />}
                                    content={skhera.description}
                                    position='top center'
                                    size='tiny'
                                    inverted
                                />
                            </Grid.Column>
                        </Grid>
                    </Popup>
                </> : this.props.user.role === COURSIER_ROLE ? <RenderStatus></RenderStatus>
                    : <Icon as='i' size='large' color={color} name={name} />
            )
        }
        const MenuRender = () => {
            return this.props.menus.map(item => {
                return (
                    <>
                        <Menu.Item style={{ marginRight: '0.0em', marginLeft: '0.0em', padding: '0px 0px' }} >
                            <Button onClick={() => this.props.setMenu(item.label)} color={this.setcolor(item.label)} primary={false} as={Link} to={item.url} style={{ fontWeight: 'normal', textAlign: 'left', width: '212px', fontFamily: 'Ropa Sans', marginLeft: '0em', padding: '1.4em 2em' }}>
                                <span>{item.label}</span>
                            </Button>
                        </Menu.Item>
                    </>
                )
            })
        }
        const { sidebarOpened } = this.state

        return (
            <>
                <Responsive getWidth={this.props.getWidth} minWidth={Responsive.onlyTablet.minWidth}>

                    <Menu secondary borderless={false} size='large'>
                        <Container style={{ marginTop: '2em', marginBottom: '49px' }}>
                            <Menu.Item> <Image href="/" alt='logo' style={{ height: '36px', width: '112px' }} src='/assets/images/Logo_Jible.png' /> </Menu.Item>
                            <Menu.Menu position='right' >
                                <Menu.Item>
                                    <RenderNotification></RenderNotification>
                                </Menu.Item>
                                <Menu.Item>
                                    <Header as='h3'>
                                        <Popup on='click' content={<Button onClick={() => this.props.signout()} color='grs' content='Sign out' fluid />} trigger={<Image circular src={this.props.user.image} />} wide>
                                        </Popup>
                                        <span style={{ padding: '0px 8px', height: '17px', width: '73px', color: '#000000', fontWeight: 'normal', fontFamily: 'Ropa Sans', fontSize: '16px', lineheight: '17px' }}>{this.props.user.fullname}</span>
                                    </Header>
                                </Menu.Item>


                            </Menu.Menu>
                        </Container>
                    </Menu>
                </Responsive>
                <Responsive

                    getWidth={this.props.getWidth}
                    maxWidth={Responsive.onlyMobile.maxWidth}
                >
                    <Menu color='grs' secondary size='large'>
                        <Menu.Item >
                            <Image href="/" alt='logo' style={{ height: '36px', width: '112px' }} src='/assets/images/Logo_Jible.png' />
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <RenderNotification></RenderNotification>
                            <Icon onClick={this.handleToggle} name='sidebar' />
                        </Menu.Item>
                    </Menu>

                    <Sidebar
                        color='grs'
                        as={Menu}
                        animation='push'
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={sidebarOpened}
                        direction='right'
                        style={{ backgroundColor: 'grs' }}
                        className='mobile'
                    >
                        <Menu color='grs' vertical secondary size='large'>

                            <Menu.Item style={{ marginTop: '3em', marginBottom: '2.5em' }}>
                                <Header style={{ marginLeft: '-4em' }}><Image circular src={this.props.user.image} />
                                    <span style={{ padding: '0px 8px', height: '17px', width: '73px', color: '#FFFF', fontWeight: 'normal', fontFamily: 'Ropa Sans', fontSize: '18px', lineheight: '17px' }}>{this.props.user.fullname}</span>
                                </Header>
                            </Menu.Item>
                            <MenuRender></MenuRender>
                            <Menu.Item style={{ marginRight: '0.0em', marginLeft: '0.0em', padding: '0px 0px' }} >
                                <Button onClick={() => this.props.signout()} color={this.setcolor('')} primary={false} style={{ fontWeight: 'normal', textAlign: 'left', width: '212px', fontFamily: 'Ropa Sans', marginLeft: '0em', padding: '1.4em 2em' }}>
                                    <span>Signout</span>
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Sidebar>
                </Responsive>

            </>
        )
    }
}