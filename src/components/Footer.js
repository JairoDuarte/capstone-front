import React from 'react'
import { Link } from 'react-router-dom';

import {Container, Menu, Image} from 'semantic-ui-react';

export default function Footer (){

    return (
      <Menu text>
        <Container style={{ marginTop: '2em', marginBottom: '49px' }}>
          <Menu.Item> <Image href="/" alt='logo' style={{ marginLeft: '1em', height: '36px', width: '112px' }} src='/assets/images/Logo_Jible.png' /> </Menu.Item>
          <Menu.Menu position='right' >
            <Menu.Item name='About'  as={Link} to='/about' style={{ color: '#000000', fontSize: '16px' }} />
            <Menu.Item
              name='Terms'
              position='right'
              as={Link}
              to='/terms'
              style={{ color: '#000000', fontSize: '16px' }}
            >
            </Menu.Item>
            <Menu.Item
              name='Privacy Policy'
              position='right'
              as='a'
              style={{ color: '#000000', fontSize: '16px' }}
            />
          </Menu.Menu>
        </Container>
      </Menu>
    )
}