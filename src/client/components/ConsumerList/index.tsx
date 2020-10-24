import React from 'react';
import { ConsumersPropsInterface } from './contract';
import { generateRoutePath } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { formatBytes } from '../../tools/utils';

const RenderList: React.FC<ConsumersPropsInterface> = ({ consumers }) => {
    const data = [];
    for (const id in consumers) {
        const consumer = consumers[id];
        data.push(
            <tr key={consumer.id}>
                <td className={'text-break'}>
                    <Link
                        key={consumer.id}
                        to={generateRoutePath('consumer', {
                            consumerId: consumer.id,
                            namespace: consumer.namespace,
                            queueName: consumer.queueName
                        })}
                    >
                        {consumer.id}
                    </Link>
                </td>
                <td>
                    {consumer.resources.pid} /
                    <br />
                    {consumer.resources.hostname}
                </td>
                <td>{consumer.resources.ipAddress.join('<br />')}</td>
                <td>{consumer.rates.processing}</td>
                <td>{consumer.rates.acknowledged}</td>
                <td>{consumer.rates.unacknowledged}</td>
                <td>{consumer.resources.cpu.percentage}</td>
                <td>{formatBytes(consumer.resources.ram.usage.rss)}</td>
                <td>{formatBytes(consumer.resources.ram.free)}</td>
                <td>{formatBytes(consumer.resources.ram.total)}</td>
            </tr>
        );
    }

    if (!data.length) {
        return <p>No existing consumers yet.</p>;
    }

    return (
        <>
            <p>
                Note: Sometimes the CPU usage is not accurate and does not match the real CPU usage. Therefore it should
                be regarded just as an indicative value.
            </p>
            <table className={'table .consumers'}>
                <thead className={'thead-light'}>
                    <tr>
                        <th rowSpan={3}>ID</th>
                        <th rowSpan={3}>
                            PID /
                            <br />
                            Hostname
                        </th>
                        <th rowSpan={3}>
                            IP
                            <br />
                            Address
                        </th>
                        <th rowSpan={3}>
                            Processing <br />
                            msg/sec
                        </th>
                        <th rowSpan={3}>
                            Acks <br />
                            msg/sec
                        </th>
                        <th rowSpan={3}>
                            Unacks <br />
                            msg/sec
                        </th>
                        <th colSpan={5}>Resources</th>
                    </tr>
                    <tr>
                        <th rowSpan={2}>
                            CPU <br /> (%)
                        </th>
                        <th colSpan={3}>Memory</th>
                    </tr>
                    <tr>
                        <th>Usage</th>
                        <th>Free</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>{data}</tbody>
            </table>
        </>
    );
};

const ConsumerList: React.FC<ConsumersPropsInterface> = (props) => {
    return (
        <div className={'consumers'}>
            <RenderList {...props} />
        </div>
    );
};

export default ConsumerList;
