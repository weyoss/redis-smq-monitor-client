import React, { useEffect, useState } from 'react';
import AppPage from './AppPage';
import websocket from '../../websocket';
import { Stats } from '../../models/Stats';
import { useDispatch, useSelector } from 'react-redux';
import { updateStats } from '../../store/stats/action';
import Socket = SocketIOClient.Socket;
import { ApplicationStateInterface } from '../../store/contract';
import { StatsStateInterface } from '../../store/stats/contract';

const App = () => {
    const [state, setSate] = useState<{ loading: boolean; init: boolean }>({
        loading: true,
        init: true
    });

    const { loading: stateLoading } = useSelector<ApplicationStateInterface, StatsStateInterface>(
        (state) => state.stats
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (state.init) {
            setSate({
                ...state,
                init: false
            });
            websocket
                .init()
                .then((socket: Socket) => {
                    setSate({
                        ...state,
                        loading: false
                    });
                    socket.on('stats', (stats: Stats) => {
                        dispatch(updateStats(stats));
                    });
                })
                .catch((e: Error) => {
                    setSate(() => {
                        throw e;
                    });
                });
        }
    }, []);

    return <AppPage loading={state.loading} stateLoading={stateLoading} />;
};

export default App;
