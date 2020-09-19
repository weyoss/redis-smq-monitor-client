import React, { useEffect, useState } from 'react';
import AppPage from './AppPage';
import WebSocket from '../../websocket';
import { Stats } from '../../models/Stats';
import { useDispatch } from 'react-redux';
import { updateStats } from '../../store/stats/action';

const App = () => {
    const [loading, updateLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    useEffect(() => {
        const ws = WebSocket();
        ws.subscribeToStats((stats: Stats) => {
            dispatch(updateStats(stats));
            updateLoading(false);
        });
    }, []);
    return <AppPage loading={loading} />;
};

export default App;
