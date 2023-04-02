import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Table } from 'react-bootstrap';
import { TWebsocketQueueConsumersPayloadConsumerInfo } from '../../transport/websocket/streams/queueConsumersStream';
import { TQueueOnlineConsumersStreamPayload } from '../../transport/websocket/streams/queueOnlineConsumersStream';

// interface IQueueConsumersListingPageProps extends Omit<IQueueConsumersListingProps, 'queueConsumersStreamName' | 'queueOnlineConsumersStreamName'>
interface IQueueConsumersPageProps {
    queueConsumers: Record<string, string>;
    onlineConsumers: TQueueOnlineConsumersStreamPayload;
    isQueueConsumersStreamLoading: boolean;
    isQueueOnlineConsumersStreamLoading: boolean;
    getConsumerLink: (id: string) => string;
}

const QueueConsumersPage: React.FC<IQueueConsumersPageProps> = ({
    isQueueConsumersStreamLoading,
    isQueueOnlineConsumersStreamLoading,
    queueConsumers,
    onlineConsumers,
    getConsumerLink,
}) => {
    if (isQueueConsumersStreamLoading || isQueueOnlineConsumersStreamLoading) {
        return <Spinner animation={'border'} />
    }
    if (!Object.keys(queueConsumers).length) {
        return <p>No consumers yet.</p>;
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
                <tbody>{
                    Object.keys(queueConsumers).map((id) => {
                        const item: TWebsocketQueueConsumersPayloadConsumerInfo = JSON.parse(queueConsumers[id]);
                        const isOnline = onlineConsumers.ids.includes(id);
                        const { pid, hostname, ipAddress, createdAt } = item;
                        return (
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
                    })
                }</tbody>
            </Table>
        </div>
    );
};

export default QueueConsumersPage;
