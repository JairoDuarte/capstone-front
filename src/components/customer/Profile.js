import React from 'react';
import {Grid, Header, Image } from 'semantic-ui-react';
import UpdateUserForm from './UpdateUserForm';
import ErrorMessage from '../ErrorMessage';

export default  function Profile (props)  {

    return (
        <>
        {props.errMess ? 
            <ErrorMessage header={props.errMess} message= 'Retry the update' ></ErrorMessage> :
            <></>
        }
        <Grid columns={2} stackable style={{ marginBottom: '3.2em' }} >
            <Grid.Row>
                <Grid.Column>
                    <Header as='h3'>
                        <Image circular src={props.user.image} />

                    </Header>
                </Grid.Column>
                <Grid.Column style={{ marginTop: '0.2em' }} >
                    <span style={{ marginLeft: '-130px', height: '17px', width: '73px', color: '#000000', fontWeight: 'normal', fontFamily: 'Ropa Sans', fontSize: '16px', lineheight: '17px' }}>{props.user.fullname} <br /> </span>
                    <span style={{ marginLeft: '-130px', height: '17px', width: '73px', color: '#909090;', fontWeight: 'normal', fontFamily: 'Ropa Sans', fontSize: '16px', lineheight: '17px' }}>{props.user.phone} </span>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <UpdateUserForm updateUserService={props.updateUserService} user={props.user}></UpdateUserForm>
    </>
    )
}
