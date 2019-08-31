import React, { Component } from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';

export default class Home extends Component {
  render() {
    const { mobile } = this.props;

    return (
      <div>
        <Container
          style={{
            width: '100%',
            height: '100%',
            background: mobile
              ? 'linear-gradient(#ffffff 45%, #3c9e77 0%)'
              : 'linear-gradient(#ffffff 60%, #3c9e77 40%)',
            padding: '0em 0em'
          }}
        >
          <Header
            as="h2"
            content="How it Works."
            style={{
              marginTop: '2em',
              marginBottom: '114px',
              height: '37px',
              fontWeight: 'normal',
              width: '173',
              color: '#000000',
              fontSize: '34px',
              lineHeight: '37px'
            }}
          />
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column style={{ marginBottom: '0em' }} width={8}>
                <Header
                  textAlign={mobile ? 'center' : ''}
                  as="h3"
                  style={{ marginBottom: '45px', fontWeight: 'normal', fontSize: '24px' }}
                >
                  Request your Skhera
                  <p style={{ fontSize: '18px', marginLeft: mobile ? '' : '1em' }}>Choosing A Quality Cookware Set </p>
                </Header>
                {mobile ? (
                  ''
                ) : (
                  <Image
                    style={{ marginTop: '15em', marginBottom: '0em' }}
                    alt="app"
                    rounded
                    size="large"
                    src="assets/images/app.png"
                  />
                )}
              </Grid.Column>
              <Grid.Column floated="right" width={8}>
                <Header
                  textAlign={mobile ? 'center' : 'left'}
                  as="h3"
                  style={{ marginBottom: '130px', marginTop: '25px', fontWeight: 'normal', fontSize: '24px' }}
                >
                  EASY ORDERING
                  <p style={{ align: 'left', fontSize: '18px', margin: '0em' }}> Serve Eggs Anytime</p>
                </Header>
                <Header
                  textAlign={mobile ? 'center' : 'left'}
                  as="h3"
                  style={{ marginTop: '50px', marginBottom: '70px', fontWeight: 'normal', fontSize: '24px' }}
                >
                  REAL-TIME TRACKING
                  <p style={{ align: 'left', fontSize: '18px', margin: '0em' }}>
                    {' '}
                    Microwave Cooking Is The Wave Of The
                    <br />
                    Future
                  </p>
                </Header>

                <Grid.Column floated="right" width={8}>
                  <Header
                    textAlign={mobile ? 'center' : 'left'}
                    as="h3"
                    style={{ color: 'white', marginTop: '18px', fontWeight: 'normal', fontSize: '34px' }}
                  >
                    Track your deliveries
                    <br /> with the Jible App
                  </Header>
                  <Header
                    textAlign={mobile ? 'center' : 'left'}
                    style={{ marginBottom: mobile ? '0px' : '150px', marginTop: '0px' }}
                  >
                    <Image
                      alt="google"
                      href="http://google.com"
                      style={{ height: '57px', width: '168px' }}
                      src="assets/images/google.png"
                    ></Image>
                    <Image
                      alt="apple"
                      href="http://apple.com"
                      style={{ marginLeft: '1.0em', height: '57px', width: '168px' }}
                      src="assets/images/apple.png"
                    ></Image>
                  </Header>
                  {!mobile ? (
                    ''
                  ) : (
                    <Image
                      style={{ marginBottom: '0em', marginTop: '5em' }}
                      alt="logo"
                      rounded
                      size="large"
                      src="assets/images/app.png"
                    />
                  )}
                </Grid.Column>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}
