import React from 'react';
import { Spinner } from 'react-bootstrap';
import { TWebsocketHeartbeatStreamPayload } from '../../transport/websocket/streams/websocketHeartbeatStream';
import HeartbeatData from '../common/HeartbeatData/HeartbeatData';
import { IProducerRouteParams } from '../../routes/routes/producer';
import ProducerRates from './ProducerRates';

interface IProps extends IProducerRouteParams {
    heartbeat: TWebsocketHeartbeatStreamPayload | null;
    isLoading: boolean;
}

const Render: React.FC<IProps> = ({ isLoading, heartbeat, namespace, queueName, producerId }) => {
    if (isLoading) {
        return <Spinner animation={'border'} />;
    }
    if (!heartbeat) {
        return <p>Producer does not exists or went offline.</p>;
    }

    return (
        <div className={'mb-4'}>
            <h2 className={'display-5'}>Rates</h2>
            <ProducerRates namespace={namespace} queueName={queueName} producerId={producerId} />
            <h2 className={'display-5'}>RAM & CPU</h2>
            <HeartbeatData {...heartbeat} />
        </div>
    );
};

const ProducerPage: React.FC<IProps> = (props) => {
    const { producerId } = props;
    return (
        <>
            <h1 className={'display-4'}>Producer ID {producerId}</h1>
            <Render {...props} />
        </>
    );
};

export default ProducerPage;
