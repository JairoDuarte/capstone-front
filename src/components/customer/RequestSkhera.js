import React, { Component } from 'react'
import { DateTimeInput } from 'semantic-ui-calendar-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Icon, Grid, Form, Input, TextArea, Button, Select, Header } from 'semantic-ui-react';
import Map from './Map';
import api from '../../services/api';
import ErrorMessage from '../ErrorMessage';

let deliverOptions = [
    { key: 1, text: 'ASAP', value: 'ASAP' },
    { key: 2, text: '2-Hour', value: '2-Hour' },
    { key: 3, text: '4-hour', value: '4-hour' },
]

const getCoordinates = async address => {
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
            from: { text: '', coordinates: [0, 0] },
            to: { text: '', coordinates: [0, 0] },
            description: '',
            deliver: '',
            price: '',
            estimatedprice: 0,
            schedule: 'Schedule',
            items: ['2k potatos'],
            item: '',
            addressFrom: '',
            addressTo: ''
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
        items.splice(items.indexOf(item), 1);
        this.setState({ items: items });
    }
    addItem = () => {
        let items = this.state.items;
        if (this.state.item.length > 3) { items.push(this.state.item); }
        this.setState({ items: items, item: '' });
    }
    handleSelect = (event, { value }) => this.setState({ deliver: value })
    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }
    handleSubmit = () => {
        let skhera = {};
        skhera.from = this.state.from;
        skhera.to = this.state.to;
        skhera.description = this.state.description;
        skhera.deliver = this.state.deliver;
        skhera.price = parseFloat(this.state.estimatedprice);
        let price = this.state.price.split('dh').join('');
        price = price.split('-');
        skhera.priceitems = {};
        skhera.priceitems.to = price[1];
        skhera.priceitems.from = price[0];
        skhera.schedule = this.state.schedule;
        skhera.items = this.state.items;
        this.props.addSkheraService(skhera);
    }

    handleSelectAddress = async () => {
        if (this.state.addressFrom !== '' && this.state.addressTo !== '') {
            let fromCoordinates = await getCoordinates(this.state.addressFrom);
            let toCoordinates = await getCoordinates(this.state.addressTo);
            this.setState({
                from: { text: this.state.addressFrom, coordinates: [fromCoordinates.lat, fromCoordinates.lng] },
                to: { text: this.state.addressTo, coordinates: [toCoordinates.lat, toCoordinates.lng] },
            })
        }
    }
    setDistance = async (distance) => {
        let price = this.state.price.split('-');
        price = parseFloat(price[1]);
        try {
            const response = this.state.price ? await api.post(`/api/skhera/price`, { distance: distance, to: price, deliver: this.state.deliver }) : {};
            price = response.data.price ? response.data.price : 0;
            this.setState({ estimatedprice: price })
        } catch (e) {
            console.log(e);
        }
    }

    render() {

        return (
            <>
                <Grid style={{ color: "#909090", fontFamily: "Ropa Sans", marginTop: '-7em', marginLeft: '-20em', fontSize: "16px", fontWeight: "normal", }}>
                    {this.props.errMessSkhera ?
                        <ErrorMessage header={this.props.errMessSkhera} message='Retry your request' ></ErrorMessage> :
                        <></>
                    }
                    <Header textAlign='left' as='h1' style={{ fontSize: "44px", fontWeight: 'normal', color: '#000000', fontFamily: "Ropa Sans", textAlign: 'left', minWidth: '100%', marginLeft: '0em', }}>Request a skhera</Header>
                    <Grid.Column width={8} style={{}}>
                        <Form style={{
                            color: "#909090",
                            fontFamily: "Ropa Sans",
                            marginLeft: '0em',
                            fontSize: "16px",
                            fontWeight: "normal",
                        }}>

                            <Form.Field>
                                <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Describe your skhera</label>
                                <TextArea onChange={this.handleInputChange} name='description' value={this.state.description} placeholder='Text here' />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal' }}>Describe your skhera</label>
                                <Input action={{ onClick: () => this.addItem(), icon: 'add', basic: true }} iconPosition='left' icon='archive' labelPosition='right' onChange={this.handleInputChange} value={this.state.item} name='item' id='item' placeholder='Item'>

                                </Input>
                            </Form.Field>

                            <Items items={this.state.items} deleteItem={this.deleteItem}></Items>

                            <Form.Group >
                                <Form.Field style={{}}>
                                    <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal' }}>Describe your skhera</label>
                                    <Select options={deliverOptions} onChange={this.handleSelect} value={this.state.deliver} style={{ minWidth: '10em', fontSize: '16px', fontWeight: 'normal', }} type='select' placeholder='ASAP' />


                                </Form.Field>
                                <Form.Field style={{ marginLeft: '10px' }}>
                                    <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Describe your skhera</label>
                                    <DateTimeInput name="schedule" placeholder="Schedule" icon='calendar outline' value={this.state.schedule} iconPosition="left" onChange={this.handleChange} />

                                </Form.Field>

                            </Form.Group>

                            <Form.Field>
                                <label style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal', }}>Describe your skhera</label>
                                <Input onChange={this.handleInputChange} value={this.state.price} name="price" icon='dollar sign' id='phone' iconPosition='left' placeholder='100dh-200dh' />
                            </Form.Field>
                            <Form.Button onClick={() => this.handleSubmit()} type="submit" color='grs' style={{ marginTop: '1em', marginLeft: '0em', width: '100%', height: '' }} disabled={!this.state.price || this.state.items.length < 1 || !this.state.description || !this.state.deliver || !this.state.price || !this.state.schedule || !this.state.to.text || !this.state.from.text}>Order Now</Form.Button>

                        </Form>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Form style={{ marginBottom: '1em' }}>

                            <PlacesAutocomplete style={{ color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal' }} value={this.state.addressFrom} onChange={(addressFrom) => this.setState({ addressFrom })} onSelect={this.handleSelectAddress}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <Form.Field>
                                            <label style={{ marginBottom: '-1em', color: '#909090', fontFamily: "Ropa Sans", fontSize: '16px', fontWeight: 'normal' }}>Address</label>    <br />

                                            <Input  {...getInputProps({ placeholder: '3416 Tenmile Road, Waltham, Massachusetts, 3 floor ...', className: 'location-search-input', })} label={{ content: 'From', basic: true }} />
                                        </Form.Field>
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
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
                            <PlacesAutocomplete value={this.state.addressTo} onChange={(addressTo) => this.setState({ addressTo })} onSelect={this.handleSelectAddress}>
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

                            {!this.state.price || this.state.items.length < 1 || !this.state.description || !this.state.deliver || !this.state.price || !this.state.schedule || !this.state.to.text || !this.state.from.text
                                ? <></>
                                : <Map setDistance={this.setDistance} estimatedprice={this.state.estimatedprice} from={this.state.from} to={this.state.to}></Map>
                            }
                        </Form>

                    </Grid.Column>
                </Grid>
            </>

        )
    }
}