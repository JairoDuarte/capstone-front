import React ,{ Component } from 'react';
import { Container, Menu, Header, Image, Button, Grid, Popup, Icon } from 'semantic-ui-react';
let _this = {};
export default class HeaderComponent extends Component {
    state = { open: false, min: 0, sec: 0, latitude: 0, longitude: 0 }

    componentDidMount() {
        _this = this;
        this.interval = setInterval(() => this.notifications(), 5000);
    }
    notifications = () => {
        if (_this.props.notifications.length > 0 && !_this.state.open) {
            let time = new Date().getTime() - _this.props.notifications[0].date;
            if (time > 60000) {
                this.props.declineSkheraService(_this.props.notifications[0]);
            }
            else {
                let min = 0;
                let sec = 60
                this.setState({ min: min, sec: sec, open: true }); 
                this.handleTimer = setInterval(() => this.timer(time), 1000);
            }

        } else if (this.state.min === 0 && this.state.sec === 0) {
            if (this.handleTimer) {
                clearInterval(this.handleTimer);
            }
            this.setState({ min: 0, sec: 60, open: false });
        }
    }
    timer = () => {
        if (this.state.sec > 0) {
            this.setState({ sec: this.state.sec - 1 })
        }
        else {
            this.setState({ sec: 0, min: 0 })
        }
    }

    render() {
        let color = this.props.notifications && this.props.notifications.length === 0 ? '' : 'green';
        let name = this.props.notifications && this.props.notifications.length === 0 ? 'bell outline' : 'bell';

        const RenderNotification = () => {
            let skhera = this.state.open ? this.props.notifications[0] : null;
            return (this.state.open ?
                <>
                    <Popup trigger={<Icon as='i' size='large' color={color} name={name} />} wide open={this.state.open}>
                        <Header>{`${this.state.min}:${this.state.sec}min`}</Header>
                        <Grid divided columns='equal'>
                            <Grid.Column>
                                <Popup
                                    trigger={<Button onClick={() => this.props.acceptSkheraService(skhera)} color='grs' content='Accepte' fluid />}
                                    content={skhera.description}
                                    position='top center'
                                    size='tiny'
                                    inverted
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Popup
                                    trigger={<Button onClick={() => this.props.declineSkheraService(skhera)} color='grl' content='Decline' fluid />}
                                    content={skhera.description}
                                    position='top center'
                                    size='tiny'
                                    inverted
                                />
                            </Grid.Column>
                        </Grid>
                    </Popup>
                </> :
                <>
                    <Icon as='i' size='large' color={color} name={name} />
                </>
            )
        }

        return (
            <Menu secondary borderless={false} size='large'>
                <Container style={{ marginTop: '2em', marginBottom: '49px' }}>
                    <Menu.Item> <Image href="/" alt='logo' style={{ height: '36px', width: '112px' }} src='/assets/images/Logo_Jible.png' /> </Menu.Item>
                    <Menu.Menu position='right' >
                        <Menu.Item>
                            <RenderNotification></RenderNotification>
                        </Menu.Item>
                        <Menu.Item>
                            <Header as='h3'>
                                <Popup on='click' content={<Button onClick={() => this.props.signout()} color='grs' content='Sign out' fluid />} trigger={<Image circular src={this.props.user.image} />} wide>
                                </Popup>
                                <span style={{ padding: '0px 8px', height: '17px', width: '73px', color: '#000000', fontWeight: 'normal', fontFamily: 'Ropa Sans', fontSize: '16px', lineheight: '17px' }}>{this.props.user.fullname}</span>
                            </Header>
                        </Menu.Item>


                    </Menu.Menu>
                </Container>
            </Menu>
        )
    }
}