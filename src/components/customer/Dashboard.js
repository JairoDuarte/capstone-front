import React, { Component } from 'react'
import { Container, Button, Grid, Icon} from 'semantic-ui-react';
import { withRouter, Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { updateUserService, addSkheraService } from '../../redux/ActionCreators';
import Menu from './Menu'
import RequestSkhera from './RequestSkhera';
import Faq from './Faq';
import Profile from './Profile';

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => ({
    updateUserService: (user) => dispatch(updateUserService(user)),
    addSkheraService: (skhera) => dispatch(addSkheraService(skhera))

});

function ButtomRequest() {

    return (
        <Button as={Link} to='/skhera/2/add' size='huge' color='grs' style={{ textAlign: 'left', width: '252px', marginLeft: '1.7em', padding: '1em 0px' }}>
            <Icon name='edit outline' size='big' style={{ marginTop: '1em', marginBottom: '1em', marginLeft: '1.0em' }} />
            <br /><span style={{ padding: '0px 30px', height: '19px', width: '148px', color: '#FFFFFF', fontFamily: 'Ropa Sans', fontSize: '18px', lineheight: '19px', marginBottom: '' }}>  Request Skhera</span>
            <Icon name='right arrow' style={{ padding: '0px 40px' }} />
        </Button>
    )
}

class Dashboard extends Component {
    state = { active: 'My Profile', columns: 3 }

    render() {
        const { params } = this.props.match;
       
        const RenderMenu = () => {
            if (!params.page) {
                return (
                    <Menu active='My Profile'></Menu>
                )
            }
            else if (params.page === 'list') {
                return (
                    <Menu active='My Skhera'></Menu>
                )
            }
            else if (params.page === 'add') {
                return (
                    <Menu active='My Skhera'></Menu>
                )
            }
            else if (params.page === 'address') {
                return (
                    <Menu active='My Address'></Menu>
                )
            }
            else if (params.page === 'faq') {
                return (
                    <Menu active='FAQ'></Menu>
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
                        <ButtomRequest></ButtomRequest>
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
                        <ButtomRequest></ButtomRequest>
                    </Grid.Column>
                    </>
                )
            }
            else if (this.props.match.params.page === 'faq') {
                
                return (
                    <>
                    <Grid.Column textAlign='left'>
                        <Faq></Faq>
                    </Grid.Column>

                    </>
                )
            }
            else if (this.props.match.params.page === 'add') {
                
                return (
                    <>
                    <Grid.Column textAlign='left'>
                        <RequestSkhera addSkheraService={this.props.addSkheraService}></RequestSkhera>
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