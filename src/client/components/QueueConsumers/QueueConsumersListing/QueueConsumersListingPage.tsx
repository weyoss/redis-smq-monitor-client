import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { TWebsocketQueueConsumersPayloadConsumerInfo } from '../../../transport/websocket/streams/queueConsumersStream';
import { IQueueConsumersListingProps } from './QueueConsumersListing';

interface IQueueConsumersListingPageProps extends Omit<IQueueConsumersListingProps, 'queueConsumersStreamName' | 'queueOnlineConsumersStreamName'> {
    queueConsumers: Record<string, string>;
    onlineConsumerIds: string[];
}

const QueueConsumersListingPage: React.FC<IQueueConsumersListingPageProps> = ({
    queueConsumers,
    getConsumerLink,
    emptyListMessage,
    onlineConsumerIds
}) => {
    const data: JSX.Element[] = [];
    for (const id in queueConsumers) {
        const item: TWebsocketQueueConsumersPayloadConsumerInfo = JSON.parse(queueConsumers[id]);
        const isOnline = onlineConsumerIds.includes(id);
        const { pid, hostname, ipAddress, createdAt } = item;
        data.push(
            <tr key={`queue-online-${id}`}>
                <td>
                    {isOnline ? (
                        <Link key={`queue-online-${id}-link`} to={getConsumerLink(id)}>
                            {id}
                        </Link>
                    ) : (
                        id
                    )}
                </td>
                <td>
                    {pid} /
                    <br />
                    {hostname}
                </td>
                <td>{ipAddress.length ? ipAddress.map((ip, index) => <div key={index}>{ip}</div>) : 'NA'}</td>
                <td>{new Date(createdAt).toUTCString()}</td>
                <td>{isOnline ? 'online' : 'offline'}</td>
            </tr>
        );
    }

    if (!data.length) {
        return <p>{emptyListMessage}</p>;
    }

    return (
        <div className={'mb-4'}>
            <Table className={'table table-striped'} hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>
                            PID /
                            <br />
                            Hostname
                        </th>
                        <th>
                            IP
                            <br />
                            Address
                        </th>
                        <th>
                            Started
                            <br />
                            at
                        </th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{data}</tbody>
            </Table>
        </div>
    );
};

export default QueueConsumersListingPage;
