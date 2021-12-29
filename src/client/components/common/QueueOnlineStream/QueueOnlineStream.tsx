import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { TWebsocketOnlineStreamPayload } from '../../../transport/websocket/streams/websocketOnlineStream';
import Websocket from '../../../transport/websocket/websocket';
import QueueOnlineStreamPage from './QueueOnlineStreamPage';
import { Spinner } from 'react-bootstrap';

export interface IQueueOnlineStreamProps {
    stream: string;
    namespace: string;
    queueName: string;
    getOnlineItemLink: (id: string) => string;
    noItemsMessage: string;
}
const QueueOnlineStream: React.FC<IQueueOnlineStreamProps> = ({
    stream,
    namespace,
    queueName,
    getOnlineItemLink,
    noItemsMessage
}) => {
    const [online, setOnline] = useState<TWebsocketOnlineStreamPayload>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Websocket()
            .then((socket: Socket) => {
                socket.on(stream, (payload: Record<string, string>) => {
                    if (isLoading) setIsLoading(false);
                    const o: TWebsocketOnlineStreamPayload = {};
                    for (const id in payload) {
                        o[id] = JSON.parse(payload[id]);
                    }
                    setOnline(o);
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

    return isLoading ? (
        <Spinner animation={'border'} />
    ) : (
        <QueueOnlineStreamPage
            namespace={namespace}
            queueName={queueName}
            online={online}
            getOnlineItemLink={getOnlineItemLink}
            noItemsMessage={noItemsMessage}
        />
    );
};

export default QueueOnlineStream;
