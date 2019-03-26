import React from 'react';

import { Message, Button  } from 'semantic-ui-react';


export function ErrorMessageRetry(props) {

    return (
        <>
            <Message
                color='red'
                header={props.header}
                content={props.message}
            />
            <Button onClick={() => props.action()} color='grs' style={{  textAlign: 'left', width: '100%' }}>
                <br /><span style={{ width: '148px', textAlign:'center', fontSize: '18px' }}> Retry</span>
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