import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import {
    Container,
    Menu,
    Button,
    Header,
    Image
} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

export default class HeaderComponent extends Component {
    state = {}

    render() {
        const { fixed } = this.state

        return (
            <Menu  fixed={fixed ? 'top' : null}
                inverted={!fixed}

                secondary
                borderless={false}
                size='large'>
                <Container style={{ marginTop: '2em', marginBottom: '49px' }}>
                    <Menu.Item> <Image href="/" alt='logo' style={{ height: '36px', width: '112px' }} src='/assets/images/Logo_Jible.png' /> </Menu.Item>
                    <Menu.Menu position='right' >
                        <Menu.Item>
                        <Header as='h4' style={{ marginTop:'0.2em', marginRight:'-1em', padding: '0px 0px'}} icon='bell outline' />
                        </Menu.Item>
                        <Menu.Item>
                            <Header as='h3'>
                            <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> <span style={{ padding: '0px 8px', height: '17px', width: '73px', color: '#000000', fontWeight: 'normal', fontFamily: 'Ropa Sans', fontSize: '16px', lineheight: '17px' }}>Jairo Duarte</span>
                        </Header>
                        </Menu.Item>
                    
                        
                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}