import React, { Component } from 'react';
import { Segment, Step, Header, Icon, List, Grid, Feed } from 'semantic-ui-react';
import Map from './Map';
import { ErrorMessageRetry } from '../ErrorMessage';

const STATUS_PICKED = 'picked';
const STATUS_DELIVERED = 'delivered';

const RenderItems = ({ items }) => items.map(item => (
  <List.Item key={item} as='li' value='*'>{item}</List.Item>
))

export default class MySkhera extends Component {
  state = { value: 0, previous: 0, from: { text: '', coordinates: [33.9954189, -6.85002289999999] }, to: { text: '', coordinates: [33.9933499, -6.848500899999976] } };

  render() {
    const statusActive = status => {
      if (status === STATUS_DELIVERED)
        return { shipping: false, delivered: true, way: false }
      else if (status === STATUS_PICKED)
        return { shipping: false, delivered: false, way: true }
      else
        return { shipping: true, delivered: false, way: false }
    }
    const steps = (status) => {
      const { shipping, delivered, way } = statusActive(status);

      return [
        {
          key: 'shipping', icon: 'info', active: shipping, title: 'Order Recieved', description: 'Message/Call',
        },
        {
          key: 'way', active: way, icon: 'motorcycle', title: 'On the way', description: 'Tracking',
        },
        { key: 'delivered', active: delivered, icon: 'check', title: 'Deliverd', description: 'Rate' },
      ]
    }

    const RenderSkhera = () => this.props.skheras.map(item => (
      <Segment.Group key={item._id}>
        <Segment>
          <Header textAlign='left'>{item.description}</Header>
          <Step.Group fluid items={steps(item.status)} />
          <Map myskhera={true} from={{ coordinates: [item.from.coordinates[1], item.from.coordinates[0]] }} isMarkerShown location={item.rider.location.coordinates} to={{ coordinates: [item.to.coordinates[1], item.to.coordinates[0]] }}></Map>
          <Grid columns={2} container >
            <Grid.Row>
              <Grid.Column style={{ marginTop: '1.2em' }}>
                <span style={{ color: '#909090', fontSize: "16px", fontWeight: "normal", }}>{item.schedule}</span><br />
                <span style={{ color: '#909090', textAlign: 'left', fontSize: "16px", fontWeight: "normal" }}>Price: {item.priceitems.from} - {item.priceitems.to}</span><br /><br />
                <span style={{ color: '#909090', textAlign: 'left', fontSize: "16px", fontWeight: "normal" }}> <Icon name='location arrow' />  {item.from.text} </span> <br /><br />
                <span>Items:</span><br />
                <List as='ol'>
                  <RenderItems items={item.items}></RenderItems>
                </List>
              </Grid.Column>
              <Grid.Column textAlign='right' style={{ marginTop: '1.2em' }}>
                <Feed>
                  <Feed.Event>
                    <Feed.Label image={item.rider.image} />
                    <Feed.Content>
                      <Feed.Date content={item.rider.phone} />
                      <Feed.Summary>
                        {item.rider.fullname}
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <Grid columns={2} container >
            <Grid.Row>
              <Grid.Column >
                <Header textAlign='left' style={{ fontFamily: "Ropa Sans", marginLeft: '0em', fontSize: "24px", fontWeight: "normal", }}>Estimated Price</Header>

              </Grid.Column>
              <Grid.Column textAlign='right'>
                <Header color='green' textAlign='right' style={{ fontFamily: "Ropa Sans", marginLeft: '0em', fontSize: "24px", fontWeight: "normal", }}>{item.price}</Header>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    ))

    return (
      <div>
        {this.props.errMessSkhera ?
          <ErrorMessageRetry action={this.props.getSkheraService} header={this.props.errMessSkhera} message='Retry your request' /> :
          <RenderSkhera></RenderSkhera>
        }
      </div>
    )
  }
}