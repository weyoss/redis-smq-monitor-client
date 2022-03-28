import React from 'react';
import OnlineConsumersPage from './OnlineConsumersPage';
import { Spinner } from 'react-bootstrap';
import useWebsocketSubscription from '../../../hooks/useWebsocketSubscription';
import { TWebsocketHeartbeatIdsStreamPayload } from '../../../transport/websocket/streams/websocketHeartbeatStream';

export interface IQueueOnlineStreamProps {
    stream: string;
    getOnlineListItemLink: (id: string) => string;
    emptyListMessage: string;
    heartbeatIdsKey: keyof TWebsocketHeartbeatIdsStreamPayload;
}
const OnlineConsumers: React.FC<IQueueOnlineStreamProps> = ({
    stream,
    getOnlineListItemLink,
    emptyListMessage,
    heartbeatIdsKey
}) => {
    const { isLoading, data } = useWebsocketSubscription<Record<string, string>>(stream, 0);
    const { isLoading: isOnlineIdsStreamLoading, data: heartbeatOnlineIdsStreamPayload } = useWebsocketSubscription<
        TWebsocketHeartbeatIdsStreamPayload
    >(`streamHeartbeatOnlineIds`, 0);
    return isLoading || isOnlineIdsStreamLoading ? (
        <Spinner animation={'border'} />
    ) : (
        <OnlineConsumersPage
            onlineList={data}
            getOnlineListItemLink={getOnlineListItemLink}
            emptyListMessage={emptyListMessage}
            heartbeatIds={heartbeatOnlineIdsStreamPayload ? heartbeatOnlineIdsStreamPayload[heartbeatIdsKey] : []}
        />
    );
};

export default OnlineConsumers;
