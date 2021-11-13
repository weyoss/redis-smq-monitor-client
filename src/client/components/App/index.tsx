import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import AppPage from './AppPage';
import websocket from '../../websocket';
import { IStats } from '../../types/IStats';
import { useDispatch } from 'react-redux';
import { setInitializedAction, updateStatsAction } from '../../store/stats/action';
import { IApplicationState } from '../../store/contract';
import { IStatsState } from '../../store/stats/state';
import useSelector from '../../hooks/useSelector';
import { IModalState } from '../../store/modal/state';
import { INotificationsState } from '../../store/notifications/state';

const App = () => {
    const statsState = useSelector<IApplicationState, IStatsState>((state) => state.stats);
    const modalState = useSelector<IApplicationState, IModalState>((state) => state.modal);
    const notificationsState = useSelector<IApplicationState, INotificationsState>((state) => state.notifications);
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
    return <AppPage statsState={statsState} modalState={modalState} notificationsState={notificationsState} />;
};

export default App;
