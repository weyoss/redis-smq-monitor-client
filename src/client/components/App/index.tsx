import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import AppPage from './AppPage';
import websocket from '../../transport/websocket';
import { IStats } from '../../types/IStats';
import { useDispatch } from 'react-redux';
import { setInitializedAction, updateStatsAction } from '../../store/stats/action';
import { IStoreState } from '../../store/state';
import { IStatsState } from '../../store/stats/state';
import useSelector from '../../hooks/useSelector';
import { INotificationsState } from '../../store/notifications/state';

const App = () => {
    const statsState = useSelector<IStoreState, IStatsState>((state) => state.stats);
    const notificationsState = useSelector<IStoreState, INotificationsState>((state) => state.notifications);
    const dispatch = useDispatch();
    useEffect(() => {
        if (statsState.init) {
            websocket
                .init()
                .then((socket: Socket) => {
                    socket.on('stats', (stats: IStats) => {
                        if (statsState.init) dispatch(setInitializedAction());
                        dispatch(updateStatsAction(stats));
                    });
                })
                .catch((e: Error) => {
                    throw e;
                });
        }
    }, []);
    return <AppPage statsState={statsState} notificationsState={notificationsState} />;
};

export default App;
