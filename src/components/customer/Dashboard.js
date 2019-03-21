import React, { Component } from 'react'
import { Container, Grid, TransitionablePortal, Segment  } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Menu from './Menu'
import Profile from './Profile';
import { updateUserService, removeNotification, addNotification } from '../../actions/user';

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        notification: state.user.notification,
        open: state.user.open
    }
}


const mapDispatchToProps = dispatch => ({
    updateUserService: (user) => dispatch(updateUserService(user)),
    addNotification: (notification) => dispatch(addNotification(notification)),
    removeNotification: () => dispatch(removeNotification())
});

class Dashboard extends Component {
    state = { active: 'My Profile', open: false, columns: 3, menus: [{ label: 'My Skhera', url: '/skhera/2/list' }, { label: 'My Profile', url: '/profile/3' }, { label: 'My Address', url: '/profile/3/address' }, { label: 'FAQ', url: '/profile/2/faq' }] }
    
    render() {
        const { params } = this.props.match;

        const RenderMenu = () => {
            if (!params.page) {
                return (
                    <Menu active='My Profile' menus={this.state.menus}></Menu>
                )
            }
            else if (params.page === 'list') {
                return (
                    <Menu active='My Skhera' menus={this.state.menus}></Menu>
                )
            }
            else if (params.page === 'add') {
                return (
                    <Menu active='My Skhera' menus={this.state.menus}></Menu>
                )
            }
            else if (params.page === 'address') {
                return (
                    <Menu active='My Address' menus={this.state.menus}></Menu>
                )
            }
            else if (params.page === 'faq') {
                return (
                    <Menu active='FAQ' menus={this.state.menus}></Menu>
                )
            }
        }
        const RenderComponent = () => {
            if (!this.props.match.params.page) {
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
            else if (this.props.match.params.page === 'list') {

                return (
                    <>
                    </>
                )
            }
            else if (this.props.match.params.page === 'address') {

                return (
                    <>
                        <Grid.Column textAlign='left'>
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </>
                )
            }
            else if (this.props.match.params.page === 'faq') {

                return (
                    <>
                        <Grid.Column textAlign='left'>
                           
                        </Grid.Column>

                    </>
                )
            }
            else if (this.props.match.params.page === 'add') {

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));