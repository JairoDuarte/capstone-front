import React, { Component } from 'react'
import { Container, Grid, TransitionablePortal, Segment} from 'semantic-ui-react';
import { withRouter} from 'react-router-dom'
import { geolocated } from 'react-geolocated';
import { connect } from 'react-redux';
import Menu from '../customer/Menu'
import Profile from '../customer/Profile';
import { updateUserService, addNotification, removeNotification, addLocation } from '../../actions/user';
import { notificationSkheraService } from '../../actions/skhera';

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        notification: state.user.notification,
        open: state.user.open,
        location: state.user.location
    }
}

const mapDispatchToProps = dispatch => ({
    updateUserService: (user) => dispatch(updateUserService(user)),
    addNotification: (notification) => dispatch(addNotification(notification)),
    removeNotification: () => dispatch(removeNotification()),
    addLocation: (location) => dispatch(addLocation(location)),
    notificationSkheraService: (notification) => dispatch(notificationSkheraService(notification))
    
});

class Dashboard extends Component {
    state = { active: 'My Profile', columns: 3, menus: [{label: 'Skherat TODO', url: '/dashboard/skhera/2/'},{label: 'My Profile', url: '/dashboard/profile/3'}, {label: 'Statistics', url: '/dashboard/statistics/3/'}, {label: 'FAQ', url: '/dashboard/faq/2/'} ]}
    
    componentDidMount(){
        const {socket} = this.props;
        this.handleLocation = setInterval(() => this.setLocation(), 1000000);

        socket.on('new skhera',({skhera, idrider}) => {
            
            if (idrider === this.props.user.id){
                let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
                for (let index = 0; index < notifications.length; index++) {
                    const element = notifications[index];
                    if (element._id === skhera._id) {
                        return null;
                    }
                }
                this.props.notificationSkheraService(skhera);
            } 
        })
    }
    setLocation = () => {
        if (this.props.isGeolocationEnabled && this.props.coords && (this.props.coords.latitude.toPrecision(4) !== this.props.location.latitude.toPrecision(4) || this.props.coords.longitude.toPrecision(4) !== this.props.location.longitude.toPrecision(4))) {
            const { socket } = this.props;
            socket.emit('location', { location: { longitude: this.props.coords.longitude, latitude: this.props.coords.latitude }, id: this.props.user.id });
            this.props.addLocation({ longitude: this.props.coords.longitude, latitude: this.props.coords.latitude });
            this.setState({ longitude: this.props.coords.longitude, latitude: this.props.coords.latitude });
        }
    }

    render() {
        const { params } = this.props.match;
       
        const RenderMenu = () => {
            
            if (params.page === 'profile') {
                return (
                    <Menu active='My Profile' menus={this.state.menus}></Menu>
                )
            }
            else if (params.page === 'skhera') {
                return (
                    <Menu active='Skherat TODO' menus={this.state.menus}></Menu>
                )
            }
            else if (params.page === 'statistics') {
                return (
                    <Menu active='Statistics' menus={this.state.menus}></Menu>
                )
            }
            else if (params.page === 'faq') {
                return (
                    <Menu active='FAQ' menus={this.state.menus}></Menu>
                )
            }
        }
        const RenderComponent = () => {
            if (params.page === 'profile') {
                return (
                    <>
                    <Grid.Column textAlign='left'>
                        <Profile updateUserService={this.props.updateUserService} user={this.props.user}></Profile>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                    </>
                )
            }
            else if (params.page === 'skhera') {

                return (
                    <>
                    </>
                )
            }
            else if (params.page === 'statistics') {

                return (
                    <>
                    <Grid.Column textAlign='left'>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                    </>
                )
            }
            else if (params.page === 'faq') {
                
                return (
                    <>
                    <Grid.Column textAlign='left'>
                    </Grid.Column>

                    </>
                )
            }
        }

        return (
            <div>
                <Container style={{ color: 'black', marginBottom: '150px', marginTop: '120px', width: '100%', height: '100%', padding: '0em 0em' }} >
                    <Grid columns={this.props.match.params.columns} container stackable  >
                        <Grid.Row>
                            <Grid.Column style={{ marginTop: '1.2em' }}>
                                <RenderMenu></RenderMenu>
                            </Grid.Column>
                            <RenderComponent></RenderComponent>
                        </Grid.Row>
                        <TransitionablePortal transition={{duration: 1000}} onClose={()=> this.props.removeNotification()} open={this.props.open}>
                            <Segment
                                raised={true}
                                
                                style={{
                                    left: '62%',
                                    position: 'absolute',
                                    top: '15%',
                                    zIndex: 1000,
                                }}
                            >
                            <h4 style={{ fontWeight: 'normal'  }}>{this.props.notification}</h4>

                            </Segment>
                        </TransitionablePortal>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Dashboard)));

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));