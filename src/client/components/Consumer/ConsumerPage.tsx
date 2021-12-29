import React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { IConsumerRouteParams } from '../../routes/routes/consumer';
import { TWebsocketHeartbeatStreamPayload } from '../../transport/websocket/streams/websocketHeartbeatStream';
import { bytesToMB } from '../../tools/utils';
import ConsumerRates from './ConsumerRates';

interface IProps extends IConsumerRouteParams {
    heartbeat: TWebsocketHeartbeatStreamPayload | null;
    isLoading: boolean;
}

const Render: React.FC<IProps> = ({ isLoading, heartbeat, namespace, queueName, consumerId }) => {
    if (isLoading) {
        return <Spinner animation={'border'} />;
    }
    if (!heartbeat) {
        return (
            <div>
                <h2>Consumer not found!</h2>
                <p>The consumer you are looking for does not exists or went offline.</p>
            </div>
        );
    }

    return (
        <div className={'mb-4'}>
            <h2 className={'display-5'}>Rates</h2>
            <ConsumerRates namespace={namespace} queueName={queueName} consumerId={consumerId} />
            <h2 className={'display-5'}>RAM & CPU</h2>
            <p>
                Note: Sometimes the CPU usage is not accurate and does not match the real CPU usage. Therefore it should
                be regarded just as an indicative value.
            </p>
            <Table className={'table table-striped'} hover>
                <thead>
                    <tr>
                        <th scope="col">RAM (RSS, MB)</th>
                        <th scope="col">CPU Usage (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{bytesToMB(heartbeat.data.ram.usage.rss)}</td>
                        <td>{heartbeat.data.cpu.percentage}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

const ConsumerPage: React.FC<IProps> = (props) => {
    const { consumerId } = props;
    return (
        <>
            <h1 className={'display-4'}>Consumer ID {consumerId}</h1>
            <Render {...props} />
        </>
    );
};

export default ConsumerPage;
