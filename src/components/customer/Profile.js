import React, { Component } from 'react'
import {
    Container,
    Grid,
    Header,
    Image,
    Icon,
} from 'semantic-ui-react';
import * as Yup from 'yup';
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { updateUserService, addSkheraService } from '../../redux/ActionCreators';
import Menu from './Menu'
import { Link } from 'react-router-dom';
import RequestSkhera from './RequestSkhera';
import Faq from './Faq';

function ButtomRequest(props) {

    return (
        <Button as={Link} to='/skhera/2/add' size='huge' color='grs' style={{ textAlign: 'left', width: '252px', marginLeft: '1.7em', padding: '1em 0px' }}>
            <Icon name='edit outline' size='big' style={{ marginTop: '1em', marginBottom: '1em', marginLeft: '1.0em' }} />
            <br /><span style={{ padding: '0px 30px', height: '19px', width: '148px', color: '#FFFFFF', fontFamily: 'Ropa Sans', fontSize: '18px', lineheight: '19px', marginBottom: '' }}>  Request Skhera</span>
            <Icon name='right arrow' style={{ padding: '0px 40px' }} />
        </Button>
    )
}


class UpdateUserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fullname: props.user.profile.fullname,
            email: props.user.profile.email,
            phone: props.user.profile.phone
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }
    handleSubmit = event => {
        let user = this.props.user;
        user.profile.fullname = this.state.fullname;
        user.profile.email = this.state.email;
        user.profile.phone = this.state.phone;
        this.props.updateUserService(user);
    }
    validationForm = () => Yup.object().shape({
        fullname: Yup.string()
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        email: Yup.string().email()
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        phone: Yup.number().min(10).max(15)
            .required('Required'),
    });

    render() {
        return (
            <Form onSubmit={(event) => { this.handleSubmit(event) }} style={{
                color: "#909090",
                fontFamily: "Ropa Sans",
                fontSize: "16px",
                fontWeight: "normal",
            }}>

                <Form.Field >
                    <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Full name</label>
                    <Input onChange={this.handleInputChange} name='fullname' value={this.state.fullname} defaultValue='52.03' icon='user outline' id='fullname' iconPosition='left' placeholder='Full name' />
                </Form.Field>
                <Form.Field>
                    <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Email</label>
                    <Input onChange={this.handleInputChange} value={this.state.email} name='email' defaultValue='52.03' icon='envelope outline' id='email' iconPosition='left' placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Phone</label>
                    <Input onChange={this.handleInputChange} value={this.state.phone} name="phone" defaultValue='52.03' icon='phone' id='phone' iconPosition='left' placeholder='212622333820' />
                </Form.Field>
                <Form.Button type="submit" color='blue' style={{ marginTop: '1em', marginLeft: '16.0em', padding: '14px 45px' }} disabled={!this.state.email || !this.state.fullname || !this.state.phone}>Update</Form.Button>

            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}
const mapDispatchToProps = dispatch => ({
    updateUserService: (user) => dispatch(updateUserService(user)),
    addSkheraService: (skhera) => dispatch(addSkheraService(skhera))

});

class Profile extends Component {
    state = { active: 'My Profile', columns: 3 }



    render() {
        const { params } = this.props.match;
        const MyProfile = () => {
            return (
                <>
                    <Grid columns={2} stackable style={{ marginBottom: '3.2em' }} >
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h3'>
                                    <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' />

                                </Header>
                            </Grid.Column>
                            <Grid.Column style={{ marginTop: '0.2em' }} >
                                <span style={{ marginLeft: '-130px', height: '17px', width: '73px', color: '#000000', fontWeight: 'normal', fontFamily: 'Ropa Sans', fontSize: '16px', lineheight: '17px' }}>Jairo Duarte <br /> </span>
                                <span style={{ marginLeft: '-130px', height: '17px', width: '73px', color: '#909090;', fontWeight: 'normal', fontFamily: 'Ropa Sans', fontSize: '16px', lineheight: '17px' }}>+212622333820 </span>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <UpdateUserForm updateUserService={this.props.updateUserService} user={this.props.user}></UpdateUserForm>
                </>
            )
        }
        const RenderButton = () => {
            return (
                params.page ? <div></div> :
                    <ButtomRequest></ButtomRequest>
            )
        }
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
                    <MyProfile></MyProfile>
                    </Grid.Column>
                    <Grid.Column>
                        <RenderButton></RenderButton>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));