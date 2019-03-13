'use strict'

import React, { Component } from 'react'
import * as Yup from 'yup';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import Map from './Map';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { Icon, Grid, Form, Input, TextArea, Button, Select, Header } from 'semantic-ui-react'


let countryOptions = [
    { key: 1, text: 'ASAP', value: 'ASAP' },
    { key: 2, text: '2-Hour', value: '2-Hour' },
    { key: 3, text: '4-hour', value: '4-hour' },
]

const getCoordinates = async address =>{
    try {
        let responce = await geocodeByAddress(address);
        let coordinates = await getLatLng(responce[0]);
        return coordinates;
    } catch (error) {
        console.error('Error', error)
    }
}

function Items({ items, deleteItem }) {

    return items.map(item => {
        return (
            <>
                <Form.Field>
                    <Button style={{ fontWeight: 'normal', textAlign: 'left', marginRight: '0.0em', width: '100%', marginLeft: '0em' }} color='blue' primary={false} animated>
                        <Button.Content visible >                     <Icon name='asterisk' /> <span style={{ padding: '0px 30px', fontSize: '18px', }}>{item}</span></Button.Content>
                        <Button.Content onClick={() => deleteItem(item)} hidden>
                            <span style={{ padding: '0px 10em', fontSize: '18px', }}>Delete</span>
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
            from: { text: '3416 Tenmile Road, Waltham, Massachusetts, 3 floor', coordinates: [41.8507300, -87.6512600]},
            to: { text: '3416 Tenmile Road, Waltham, Massachusetts, 3 floor', coordinates: [41.8525800, -87.6514100]},
            description: 'Text here',
            deliver: '',
            price: '100dh-200dh',
            schedule: 'Schedule',
            items: ['2k potatos', '1L Milk'],
            item: '',
            addressFrom: '',
            addressTo: ''
        }
    }
    componentDidMount(){
        console.log('hello');
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
        items.splice(items.indexOf(item), 1);
        this.setState({ items: items });
    }
    addItem = () => {
        console.log('add item');
        let items = this.state.items;
        if (this.state.item.length > 3) { items.push(this.state.item); }
        this.setState({ items: items, item: '' });
    }
    handleSelect = (event, { value }) => this.setState({ deliver: value })
    handleChange = (event, { name, value }) => {
        console.log('la');
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }
    handleSubmit = () => {
        let skhera = {};
        console.log('submit');
        skhera.from = this.state.from;
        skhera.to = this.state.to;
        skhera.description = this.state.description;
        skhera.deliver = this.state.deliver;
        skhera.price = this.state.price;
        skhera.schedule = this.state.schedule;
        skhera.items = this.state.items;
        this.props.addSkheraService(skhera);
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

    handleChangeAddress = ({value, name}) => {
        console.log(value);
        console.log(name);
       // this.setState({ address: address});
    };
    handleSelectAddress = async () => {
        if (!(this.state.addressFrom === '') && !(this.state.addressTo === '')) {
            let fromCoordinates = await getCoordinates(this.state.addressFrom);
            let toCoordinates = await getCoordinates(this.state.addressTo);
            this.setState({
                from: { text: this.state.addressFrom, coordinates: [fromCoordinates.lat, fromCoordinates.lng]},
                to: { text: this.state.addressTo, coordinates: [toCoordinates.lat, toCoordinates.lng]},
            })
            console.log(fromCoordinates);
        }
    };

    render() {
        return (
            <>
                <Grid style={{ color: "#909090", fontFamily: "Ropa Sans", marginTop: '-7em', marginLeft: '-20em', fontSize: "16px", fontWeight: "normal", }}>

                    <Header textAlign='left' as='h1' style={{ fontSize: "44px", fontWeight: 'normal', color: '#000000', fontFamily: "Ropa Sans", textAlign: 'left', minWidth: '100%', marginLeft: '0em', }}>Request a skhera</Header>
                    <Grid.Column width={8} style={{}}>
                        <Form  style={{
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
                                <Input labelPosition='right' action={{ onClick: () => this.addItem(), icon: 'add', basic: true }} iconPosition='left' icon='archive' labelPosition='right' onChange={this.handleInputChange} value={this.state.item} name='item' id='item' placeholder='Item'>

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
                            <Form.Button onClick={()=>this.handleSubmit()} type="submit" color='grs' style={{ marginTop: '1em', marginLeft: '0em', width: '100%', height: '' }} disabled={!this.state.price || this.state.items.length < 1 || !this.state.description || !this.state.deliver || !this.state.price || !this.state.schedule || !this.state.to || !this.state.from}>Order Now</Form.Button>

                        </Form>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Form style={{ marginBottom: '1em' }}>
                            <PlacesAutocomplete value={this.state.addressFrom} onChange={(addressFrom)=> this.setState({addressFrom})} onSelect={this.handleSelectAddress}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <Form.Field>
                                            <Input {...getInputProps({ placeholder: '3416 Tenmile Road, Waltham, Massachusetts, 3 floor ...', className: 'location-search-input', })} label={{ content: 'From', basic: true }} />
                                        </Form.Field>
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                            <PlacesAutocomplete value={this.state.addressTo} onChange={(addressTo)=> this.setState({addressTo})} onSelect={this.handleSelectAddress}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <Form.Field>
                                            <Input {...getInputProps({ placeholder: '3416 Tenmile Road, Waltham, Massachusetts, 3 floor ...', className: 'location-search-input', })} label={{ content: 'To', basic: true }} />
                                        </Form.Field>
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                            
                            {/* <LocationSearchInput address={this.state.from}></LocationSearchInput>*/}
                            {/** TODO ADD Location Search */}
                            <Map from={this.state.from} to={this.state.to}></Map>
                        </Form>
  
                    </Grid.Column>
                </Grid>
            </>

        )
    }
}