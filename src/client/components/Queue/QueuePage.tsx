import React from 'react';
import { QueuePagePropsInterface } from './contract';
import Consumers from '../Consumers';
import Producers from '../Producers';
import Timeline from '../Timeline';

const QueuePage: React.FC<QueuePagePropsInterface> = ({ queue, rates }) => {
    if (!queue) {
        return (
            <div>
                <h2>Queue not found!</h2>
                <p>The queue you are looking for does not exists.</p>
            </div>
        );
    }

    const { namespace, name, size, erroredMessages, consumers, producers } = queue;
    return (
        <div className={'queue fullWidth'}>
            <h2>Individual Queue Metrics / {name} </h2>
            <p>
                The following metrics are gathered from the <b>{name}</b> queue under the <b>{namespace}</b> namespace.
            </p>
            <hr />
            <Timeline rates={rates} />
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
            <Consumers consumers={consumers} />
            <Producers producers={producers} />
        </div>
    );
};

export default QueuePage;
