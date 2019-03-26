import React from 'react';

import { Message, Button  } from 'semantic-ui-react';


export function ErrorMessageRetry(props) {

    return (
        <>
            <Message
                header={props.header}
                content={props.message}
            />
            <Button Onclick={() => props.action} size='huge' color='grs' style={{ textAlign: 'left', width: '252px', marginLeft: '1.7em', padding: '1em 0px' }}>
                <br /><span style={{ padding: '0px 30px', height: '19px', width: '148px', color: '#FFFFFF', fontFamily: 'Ropa Sans', fontSize: '18px', lineheight: '19px', marginBottom: '' }}> Retry</span>
            </Button>
        </>
    )
}

export default function ErrorMessage(props) {
    
    return (
        <>
            <Message
                color='red'
                header={props.header}
                content={props.message}
            />
        </>
    )
}