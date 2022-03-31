import React from 'react';
import useSelector from '../../hooks/useSelector';
import { IStoreState } from '../../store/state';
import SchedulerPanelBoxPage from './SchedulerPanelBoxPage';
import { IWebsocketMainStreamState } from '../../store/websocket-main-stream/state';

const SchedulerPanelBox = () => {
    const { payload, loading } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    return <SchedulerPanelBoxPage count={payload.scheduledMessagesCount} loading={loading} />;
};

export default SchedulerPanelBox;