
import React, { Component } from 'react'
import * as Yup from 'yup';
import { DateTimeInput  } from 'semantic-ui-calendar-react';
  
import { Icon, Image, Grid, Form, Input, TextArea, Button, Select, Header } from 'semantic-ui-react'
let countryOptions =  [
    { key: 1, text: 'ASAP', value: 'ASAP' },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ]

function Items({items, deleteItem}) {

    return items.map(item => {
        return (
            <>
            <Form.Field> 
                <Button style={{fontWeight: 'normal', textAlign:'left', marginRight: '0.0em', width: '100%', marginLeft: '0em'}} color='blue' primary={false} animated>
      <Button.Content visible >                     <Icon name='asterisk' /> <span style={{ padding: '0px 30px', fontSize: '18px',}}>{item}</span></Button.Content>
      <Button.Content onClick={()=> deleteItem(item)} hidden>
         <span style={{ padding: '0px 10em', fontSize: '18px',}}>Delete</span>
      </Button.Content>
    </Button>             
            </Form.Field>
            </>
        )
    })
    
}
export default class RequestSkhera extends Component {
    constructor(props) {
        super(props)

        this.state = {
            from: '3416 Tenmile Road, Waltham, Massachusetts, 3 floor',
            to: '3416 Tenmile Road, Waltham, Massachusetts, 3 floor',
            description: 'Text here',
            deliver: '',
            price: '100dh-200dh',
            schedule: 'Schedule',
            items: ['2k potatos', '1L Milk'],
            item:''
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
    deleteItem = (item) => {
        let items = this.state.items;
        items.splice(items.indexOf(item),1);
        this.setState({items: items});
    } 
    addItem = () =>{
        
        let items = this.state.items;
        if(this.state.item.length > 3){items.push(this.state.item);}
        this.setState({items: items, item: ''});
    }
    handleSelect = (event, {value}) => this.setState({deliver: value})
    handleChange = (event, {name, value}) => {

        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }
    handleSubmit = () => {

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
            <>
                <Grid style={{ color: "#909090", fontFamily: "Ropa Sans", marginTop: '-7em', marginLeft: '-20em', fontSize: "16px", fontWeight: "normal", }}>

                    <Header textAlign='left' as='h1' style={{ fontSize: "44px", fontWeight: 'normal', color: '#000000', fontFamily: "Ropa Sans", textAlign: 'left', minWidth: '100%', marginLeft: '0em', }}>Request a skhera</Header>
                    <Grid.Column width={8} style={{}}>
                        <Form onSubmit={(event) => { this.handleSubmit(event) }} style={{
                            color: "#909090",
                            fontFamily: "Ropa Sans",
                            marginLeft: '0em',
                            fontSize: "16px",
                            fontWeight: "normal",
                        }}>

                            <Form.Field>
                                <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Describe your skhera</label>
                                <TextArea onChange={this.handleInputChange} name='description' value={this.state.description} defaultValue='52.03' icon='user outline' id='fullname' iconPosition='left' placeholder='Text here' />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal' }}>Describe your skhera</label>
                                <Input labelPosition='right' action={{ onClick: ()=>this.addItem(), icon: 'add', basic: true }} iconPosition='left' icon='archive' labelPosition='right' onChange={this.handleInputChange} value={this.state.item} name='item' id='item' placeholder='Item'>

                                </Input>
                            </Form.Field>
                            
                            <Items items={this.state.items} deleteItem={this.deleteItem}></Items>
                            
                            <Form.Group >
                                <Form.Field style={{}}>
                                    <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal' }}>Describe your skhera</label>
                                    <Select options={countryOptions} onChange={this.handleSelect} value={this.state.deliver} style={{ minWidth: '10em', fontSize: '16px', fontWeight: 'normal', }} type='select' placeholder='ASAP' />


                                </Form.Field>
                                <Form.Field style={{ marginLeft: '10px' }}>
                                    <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Describe your skhera</label>
                                    <DateTimeInput name="schedule" placeholder="Schedule" icon='calendar outline' value={this.state.schedule} iconPosition="left" onChange={this.handleChange} />
                                    
                                </Form.Field>

                            </Form.Group>

                            <Form.Field>
                                <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Describe your skhera</label>
                                <Input onChange={this.handleInputChange} value={this.state.price} name="price" defaultValue='100dh-200dh' icon='dollar sign' id='phone' iconPosition='left' placeholder='100-200' />
                            </Form.Field>
                            <Form.Button type="submit" color='grs' style={{ marginTop: '1em', marginLeft: '0em', width: '100%', height: '' }} disabled={!this.state.price || this.state.items.length < 1 || !this.state.description || !this.state.deliver || !this.state.price || !this.state.schedule || !this.state.to || !this.state.from}>Order Now</Form.Button>

                        </Form>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Form onSubmit={(event) => { this.handleSubmit(event) }} style={{ marginBottom: '1em' }}>

                            <Form.Field >
                                <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Address</label>
                                <Input label={{ content: 'From', basic: true }} onChange={this.handleInputChange} name='from' value={this.state.from} id='from' placeholder='' />
                            </Form.Field>
                            <Form.Field>
                                <Input style={{ padding: '0em 0em', fontWeight: 'normal', }} label={{ content: 'To', basic: true }} onChange={this.handleInputChange} value={this.state.to} name='to' id='to' placeholder='' />
                            </Form.Field>
                        </Form>
                        <Image src='/assets/images/map.png' />
                    </Grid.Column>
                </Grid>
            </>

        )
    }
}