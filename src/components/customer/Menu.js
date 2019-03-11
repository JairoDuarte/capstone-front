import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class MenuComponent extends Component {
  state = { activeItem: this.props.active }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = ( name ) => this.setState({ activeItem: name })

  setcolor = name =>{
    return name === this.state.activeItem ? 'grs' : 'red';
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu className='' style={{ textAlign:'left', marginLeft: '1em' }}  secondary vertical>
       <Menu.Item>
       </Menu.Item>
       <Menu.Item style={{ marginRight: '0.0em', marginLeft: '0.0em', padding: '0px 0px' }} >
        <Button onClick={()=>this.handleClick('My Skhera')} color={this.setcolor('My Skhera')} primary={false} as={Link} to='/skhera/2/list' style={{ fontWeight: 'normal', textAlign:'left', width: '212px',  fontFamily: 'Ropa Sans', marginLeft: '0em', padding: '1.4em 2em' }}>
        <span>My Skhera</span>
        </Button>
                  
       </Menu.Item>
       <Menu.Item as={Link} to='/profile/3' style={{ marginRight: '0.0em', marginLeft: '0.0em', padding: '0px 0px' }} >
        <Button onClick={() =>this.handleClick('My Profile')} color={this.setcolor('My Profile')} primary={false} as='a' style={{ fontWeight: 'normal',  textAlign:'left', width: '212px',  fontFamily: 'Ropa Sans', marginLeft: '0em', padding: '1.4em 2em' }}>
        <span>My Profile</span>
        </Button>
                  
       </Menu.Item>
       <Menu.Item as={Link} to='/profile/3/address' style={{ marginRight: '0.0em', marginLeft: '0.0em', padding: '0px 0px' }} >
        <Button onClick={() => this.handleClick('My Address')} color={this.setcolor('My Address')} primary={false} as='a' style={{ fontWeight: 'normal', textAlign:'left', width: '212px',  fontFamily: 'Ropa Sans', marginLeft: '0em', padding: '1.4em 2em' }}>
        <span>My Address</span>
        </Button>
                  
       </Menu.Item>
       <Menu.Item as={Link} to='/profile/2/faq' style={{ marginRight: '0.0em', marginLeft: '0.0em', padding: '0px 0px' }} >
        <Button onClick={() => this.handleClick('FAQ')} color={this.setcolor('FAQ')} primary={false} as='a' style={{ fontWeight: 'normal', textAlign:'left', width: '212px',  fontFamily: 'Ropa Sans', marginLeft: '0em', padding: '1.4em 2em' }}>
        <span>FAQ</span>
        </Button>
                  
       </Menu.Item>
        
      </Menu>
    )
  }
}