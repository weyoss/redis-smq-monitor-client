import React from 'react';
import OnlineStreamPage from './OnlineStreamPage';
import { Spinner } from 'react-bootstrap';
import useWebsocketSubscription from '../../../hooks/useWebsocketSubscription';

export interface IQueueOnlineStreamProps {
    stream: string;
    getOnlineItemLink: (id: string) => string;
    noItemsMessage: string;
}
const OnlineStream: React.FC<IQueueOnlineStreamProps> = ({ stream, getOnlineItemLink, noItemsMessage }) => {
    const { isLoading, data: online } = useWebsocketSubscription<Record<string, string>>(stream, 0);
    return isLoading ? (
        <Spinner animation={'border'} />
    ) : (
        <OnlineStreamPage online={online} getOnlineItemLink={getOnlineItemLink} noItemsMessage={noItemsMessage} />
    );
};

export default OnlineStream;
