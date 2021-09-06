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
    const { namespace, queueName, size, erroredMessages, consumers, producers } = queue;
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
                        <th>Size</th>
                        <th>Failed messages</th>
                        <th>Consumers</th>
                        <th>Producers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{size}</td>
                        <td>{erroredMessages}</td>
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
