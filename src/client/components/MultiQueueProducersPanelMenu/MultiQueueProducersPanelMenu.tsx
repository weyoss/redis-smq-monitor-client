import useSelector from '../../hooks/useSelector';
import { IStoreState } from '../../store/state';
import { IWebsocketMainStreamState } from '../../store/websocketMainStream/state';
import React from 'react';
import MultiQueueProducersPanelMenuPage from './MultiQueueProducersPanelMenuPage';

const MultiQueueProducersPanelMenu = () => {
    const { payload, loading } = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    return <MultiQueueProducersPanelMenuPage count={payload.multiQueueProducersCount} loading={loading} />;
};

export default MultiQueueProducersPanelMenu;
