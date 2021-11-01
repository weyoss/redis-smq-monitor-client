import React from 'react';
import { QueuePagePropsInterface } from './contract';
import ConsumerList from '../ConsumerList';
import ProducerList from '../ProducerList';
import RatesChart from '../RatesChart';

const QueuePage: React.FC<QueuePagePropsInterface> = ({ queue, rates }) => {
    if (!queue) {
        return (
            <div>
                <h2>Queue not found!</h2>
                <p>The queue you are looking for does not exists.</p>
            </div>
        );
    }
    const {
        namespace,
        queueName,
        acknowledgedMessages,
        deadLetteredMessages,
        pendingMessages,
        pendingMessagesWithPriority,
        consumers,
        producers
    } = queue;
    return (
        <div className={'queue fullWidth'}>
            <h2>Individual Queue Metrics / {queueName} </h2>
            <p>
                The following metrics are gathered from the <b>{queueName}</b> queue under the <b>{namespace}</b>{' '}
                namespace.
            </p>
            <hr />
            <RatesChart rates={rates} scope={`${namespace}-${queueName}`} />
            <hr />
            <h3>Queue metrics</h3>
            <table className="table">
                <thead className={'thead-light'}>
                    <tr>
                        <th>Pending messages</th>
                        <th>Pending messages with priority</th>
                        <th>Acknowledged messages</th>
                        <th>Dead-lettered messages</th>
                        <th>Consumers</th>
                        <th>Producers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{pendingMessages}</td>
                        <td>{pendingMessagesWithPriority}</td>
                        <td>{acknowledgedMessages}</td>
                        <td>{deadLetteredMessages}</td>
                        <td>{Object.keys(consumers).length}</td>
                        <td>{Object.keys(producers).length}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Consumers</h3>
            <ConsumerList consumers={consumers} />
            <h3>Producers</h3>
            <ProducerList producers={producers} />
        </div>
    );
};

export default QueuePage;
