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


export default  function Profile (props)  {

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
        <UpdateUserForm updateUserService={props.updateUserService} user={props.user}></UpdateUserForm>
    </>
    )
}
