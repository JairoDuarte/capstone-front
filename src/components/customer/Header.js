import React from 'react';
import { Container, Menu, Header, Image } from 'semantic-ui-react';
import { Button, Popup } from 'semantic-ui-react';

export default function HeaderComponent (props) {
    
        return (
            <Menu secondary borderless={false} size='large'>
                <Container style={{ marginTop: '2em', marginBottom: '49px' }}>
                    <Menu.Item> <Image href="/" alt='logo' style={{ height: '36px', width: '112px' }} src='/assets/images/Logo_Jible.png' /> </Menu.Item>
                    <Menu.Menu position='right' >
                        <Menu.Item>
                        <Header as='h4' style={{ marginTop:'0.2em', marginRight:'-1em', padding: '0px 0px'}} icon='bell outline' />
                        </Menu.Item>
                        <Menu.Item>
                        <Header as='h3'>
                                <Popup on='click' content={<Button onClick={()=>props.signout()} color='grs' content='Sign out' fluid />} trigger={<Image circular src={props.user.image} />} wide>
                                </Popup>
                                <span style={{ padding: '0px 8px', height: '17px', width: '73px', color: '#000000', fontWeight: 'normal', fontFamily: 'Ropa Sans', fontSize: '16px', lineheight: '17px' }}>{props.user.fullname}</span>
                            </Header>
                        </Menu.Item>
                    
                        
                    </Menu.Menu>
                </Container>
            </Menu>
        )
}