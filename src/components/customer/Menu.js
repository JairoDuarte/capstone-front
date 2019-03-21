import React, { Component } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class MenuComponent extends Component {
  state = { activeItem: this.props.active }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = ( name ) => this.setState({ activeItem: name })

  setcolor = name =>{
    return name === this.state.activeItem ? 'grs' : 'pink';
  }

  render() {
    const MenuRender = ()=> {
      return this.props.menus.map(item=> {
        return (
          <>
            <Menu.Item style={{ marginRight: '0.0em', marginLeft: '0.0em', padding: '0px 0px' }} >
              <Button onClick={()=>this.handleClick(item.label)} color={this.setcolor(item.label)} primary={false} as={Link} to={item.url} style={{ fontWeight: 'normal', textAlign:'left', width: '212px',  fontFamily: 'Ropa Sans', marginLeft: '0em', padding: '1.4em 2em' }}>
              <span>{item.label}</span>
              </Button>          
            </Menu.Item>
          </>
        )
      })
    } 
    
    return (
      <Menu className='' style={{ textAlign:'left', marginLeft: '1em' }}  secondary vertical>
       <Menu.Item>
       </Menu.Item>
       <MenuRender></MenuRender>
      </Menu>
    )
  }
}