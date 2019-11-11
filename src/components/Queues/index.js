'use strict';

import React from "react";
import { Header, Label, Divider, LabelGroup } from "semantic-ui-react";

import {Queue} from "./Queue";

import './Queues.css'

export const Queues = props => {

    const [ selectedQueue, setSelectedQueue ] = React.useState({});

    /*
        (<div className={'wrapper'}>
            <LabelGroup>
                {props.queues.map((item) => {
                    return (
                        <Label size={'large'} active={item.name === selectedQueue} as='a' key={item.name} name={item.name} onClick={() => setSelectedQueue(item.name)}>
                            {item.name}
                            <Label.Detail>{item.size}</Label.Detail>
                        </Label>
                    )
                })}
            </LabelGroup>
            <Divider/>
            <Queue queue={props.queues.find((i) => (i.name === selectedQueue))} />
        </div>)
        :
        (<p>No existing queues yet.</p>)
    */


    function renderQueues(queuesByNamespace) {
        console.log(JSON.stringify(queuesByNamespace));

        const data = [];
        for (const ns in queuesByNamespace) {
            console.log('fffffff');
            const queuesByName = queuesByNamespace[ns];
            for (const queueName in queuesByName) {
                const queue = queuesByName[queueName];
                const key = `${ns}-${queueName}`;
                data.push(
                    <Label size={'large'} active={key === `${selectedQueue.ns}-${selectedQueue.queueName}`} as='a'
                           key={key} name={key} onClick={() => setSelectedQueue({ns, queueName})}>
                        {`${ns}/${queueName}`}
                        <Label.Detail>{queue.size}</Label.Detail>
                    </Label>
                );
            }
        }
        if (!data.length) {
            return (<p>No existing queues yet.</p>);
        }
        return (
            <div className={'wrapper'}>
                <LabelGroup>
                    {data}
                </LabelGroup>
                <Divider/>
                <Queue
                    queue={Object.keys(selectedQueue).length ? props.queues[selectedQueue.ns][selectedQueue.queueName] : null}/>
            </div>
        );
    }

    return (
        <div className={'Queues'}>
            <Header size='large'>Queues</Header>
            {renderQueues(props.queues)}
            <Divider/>
        </div>
    );
};