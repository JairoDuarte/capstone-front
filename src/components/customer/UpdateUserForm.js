import React, { Component } from 'react';
import * as Yup from 'yup';
import { Label, Form, Input } from 'semantic-ui-react';


export default  class UpdateUserForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fullname: props.user.fullname,
            email: props.user.email,
            phone: props.user.phone,
            errors: {fullname: false, email: false, phone: false, text: ''}
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
    handleSubmit = () => {
        let user = this.props.user;
        user.fullname = this.state.fullname;
        user.email = this.state.email;
        user.phone = this.state.phone;
        this.validationForm().validate(user)
        .then(valid=>{
            this.setState({errors: {...this.state.errors,email: false, fullname: false, phone: false }});
            this.props.updateUserService(user);
        }).catch(err =>{
            console.log(err);
            if (err.params.path === 'email') {
                this.setState({errors: {...this.state.errors,email: true, text: err.message }});
                console.log(user.phone);
                
            }else if(err.params.path === 'fullname'){
                this.setState({errors: {...this.state.errors, fullname: true, text: err.message }});
            }else if(err.params.path === 'phone'){
                this.setState({errors: {...this.state.errors, phone: true, text: err.message }});
            }
        })

    }
    validationForm = () => Yup.object().shape({
        fullname: Yup.string()
            .min(8, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        email: Yup.string().email()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phone: Yup.number()
            .min(10, 'Too Short!')
    });

    render() {
        const {errors} = this.state;
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
                    {errors.fullname ? ( <Label basic color='red' pointing>{errors.firstName}</Label>) : null}

                </Form.Field>
                <Form.Field>
                    <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Email</label>
                    <Input onChange={this.handleInputChange} value={this.state.email} name='email' defaultValue='52.03' icon='envelope outline' id='email' iconPosition='left' placeholder='Email' />
                    {errors.email ? ( <Label basic color='red' pointing>{errors.text}</Label>) : null}

                </Form.Field>
                <Form.Field>
                    <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Phone</label>
                    <Input onChange={this.handleInputChange} value={this.state.phone} name="phone" defaultValue='52.03' icon='phone' id='phone' iconPosition='left' placeholder='212622333820' />
                    {errors.phone ? ( <Label basic color='red' pointing>{errors.text}</Label>) : null}

                </Form.Field>
                <Form.Button type="submit" color='blue' style={{ marginTop: '1em', marginLeft: '0.0em', height: '2.5em', width: '100%',  padding: '0px 0px' }} disabled={!this.state.email || !this.state.fullname || !this.state.phone}>Update</Form.Button>

            </Form>
        )
    }
}

