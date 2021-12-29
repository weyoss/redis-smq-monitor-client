import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { IConsumerRouteParams } from '../../routes/routes/consumer';
import ConsumerPage from './ConsumerPage';
import Websocket from '../../transport/websocket/websocket';
import { Socket } from 'socket.io-client';
import { TWebsocketHeartbeatStreamPayload } from '../../transport/websocket/streams/websocketHeartbeatStream';

const Consumer: React.FC<RouteComponentProps<IConsumerRouteParams>> = ({ match }) => {
    const { namespace, queueName, consumerId } = match.params;
    const [heartbeat, setHeartbeat] = useState<TWebsocketHeartbeatStreamPayload | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stream = `streamConsumerHeartbeat:${consumerId}`;
        Websocket()
            .then((socket: Socket) => {
                socket.on(stream, (payload: TWebsocketHeartbeatStreamPayload) => {
                    if (isLoading) setIsLoading(false);
                    setHeartbeat(payload);
                });
            })
            .catch((e: Error) => {
                throw e;
            });

        return () => {
            Websocket().then((socket) => {
                socket.removeAllListeners(stream);
            });
        };
    }, []);

    return (
        <ConsumerPage
            consumerId={consumerId}
            queueName={queueName}
            namespace={namespace}
            heartbeat={heartbeat}
            isLoading={isLoading}
        />
    );
};

export default Consumer;
