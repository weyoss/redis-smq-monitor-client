import React from 'react';
import useSelector from '../../hooks/useSelector';
import { IStoreState } from '../../store/state';
import SchedulerPanelMenuPage from './SchedulerPanelMenuPage';
import { IWebsocketMainStreamState } from '../../store/websocketMainStream/state';

const SchedulerPanelMenu = () => {
    const { payload, loading } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    return <SchedulerPanelMenuPage count={payload.scheduledMessagesCount} loading={loading} />;
};

export default SchedulerPanelMenu;
