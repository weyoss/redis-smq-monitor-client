import React from 'react';
import { Spinner } from 'react-bootstrap';
import { IConsumerRouteParams } from '../../routes/routes/consumer';
import { TWebsocketHeartbeatStreamPayload } from '../../transport/websocket/streams/websocketHeartbeatStream';
import ConsumerRates from './ConsumerRates';
import HeartbeatData from '../common/HeartbeatData/HeartbeatData';

interface IProps extends IConsumerRouteParams {
    heartbeat: TWebsocketHeartbeatStreamPayload | null;
    isLoading: boolean;
}

const Render: React.FC<IProps> = ({ isLoading, heartbeat, namespace, queueName, consumerId }) => {
    if (isLoading) {
        return <Spinner animation={'border'} />;
    }
    if (!heartbeat) {
        return <p>Consumer does not exists or went offline.</p>;
    }

    return (
        <div className={'mb-4'}>
            <h2 className={'display-5'}>Rates</h2>
            <ConsumerRates namespace={namespace} queueName={queueName} consumerId={consumerId} />
            <h2 className={'display-5'}>RAM & CPU</h2>
            <HeartbeatData {...heartbeat} />
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
