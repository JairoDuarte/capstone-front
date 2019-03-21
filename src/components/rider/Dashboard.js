import React, { Component } from 'react'
import { Container, Grid} from 'semantic-ui-react';
import { withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import Menu from '../customer/Menu'
import Profile from '../customer/Profile';
import { updateUserService } from '../../actions/user';

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => ({
    updateUserService: (user) => dispatch(updateUserService(user))
});

class Dashboard extends Component {
    state = { active: 'My Profile', columns: 3, menus: [{label: 'Skherat TODO', url: '/dashboard/skhera/2/'},{label: 'My Profile', url: '/dashboard/profile/3'}, {label: 'Statistics', url: '/dashboard/statistics/3/'}, {label: 'FAQ', url: '/dashboard/faq/2/'} ]}
    
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
                    </Grid>
                </Container>
            </div>
        )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));