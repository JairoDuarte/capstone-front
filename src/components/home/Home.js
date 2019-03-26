import React, { Component } from 'react'
import {
  Container,
  Grid,
  Header,
  Image,
} from 'semantic-ui-react';

export default class MenuExampleSecondary extends Component {

  render() {

    return (
      <div>
        <Container style={{ width: '100%', height: '100%', background: "linear-gradient(#ffffff 60%, #3c9e77 40%)", padding: '0em 0em' }} >

          <Header
            as='h2'
            content='How it Works.'
            style={{padding: '50px 5em' ,marginBottom: '114px', height: '37px', fontWeight: 'normal', width: '173', color: '#000000', fontSize: '34px', lineHeight: '37px' }}
          />
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column style={{marginBottom: '0em'}}  width={8}>
                <Header as='h3' style={{ marginBottom: '45px', fontWeight: 'normal', fontSize: '24px' }}>
                  Request you Skhera
                  <p style={{ fontSize: '18px', marginLeft: '1em' }}>Choosing A Quality Cookware Set </p>
                </Header>
                  
                <Image style={{marginTop: '15em',marginBottom: '0em'}}  rounded size='large' src='assets/images/app.png' />
               

              </Grid.Column>
              <Grid.Column floated='right' width={8}>
                <Header textAlign='left'  as='h3' style={{ marginBottom: '130px', marginTop: '25px', fontWeight: 'normal', fontSize: '24px' }}>
                  EASY ORDERING
                  <p style={{	align: 'left', fontSize: '18px', margin: '0em'}}> Serve Eggs Anytime</p>
                </Header>
                <Header textAlign='left' as='h3' style={{ marginTop: '50px',marginBottom: '70px', fontWeight: 'normal', fontSize: '24px' }}>
                  REAL-TIME TRACKING
                  <p style={{	align: 'left', fontSize: '18px', margin: '0em'}}> Microwave Cooking Is The Wave Of The<br/>Future</p>
                </Header>
                <Grid.Column floated='right' width={8}>
                <Header textAlign='left'  as='h3' style={{ color:'white', marginTop: '18px', fontWeight: 'normal', fontSize: '34px' }}>
                  Track your deliveries<br/> with the Jible App
                </Header>
                <Header textAlign='left'  style={{marginBottom: '150px', marginTop: '0px'}}>
                  <Image href='http://google.com' style={{height: '57px',	width: '168px'}} src='assets/images/google.png'></Image>
                  <Image href='http://google.com' style={{marginLeft:'1.0em', height: '57px',	width: '168px'}} src='assets/images/apple.png'></Image>
                </Header>
              </Grid.Column>
              </Grid.Column>
             
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    )
  }
}