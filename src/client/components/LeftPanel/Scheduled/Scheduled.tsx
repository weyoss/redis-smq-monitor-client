import React from 'react';
import useSelector from '../../../hooks/useSelector';
import { IStoreState } from '../../../store/state';
import ScheduledPage from './ScheduledPage';
import { IWebsocketMainStreamState } from '../../../store/websocket-main-stream/state';

const Scheduled = () => {
    const { payload } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    return <ScheduledPage count={payload.scheduledMessagesCount} />;
};

export default Scheduled;
