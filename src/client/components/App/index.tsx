import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import AppPage from './AppPage';
import Websocket from '../../transport/websocket/websocket';
import { useDispatch } from 'react-redux';
import { IStoreState } from '../../store/state';
import useSelector from '../../hooks/useSelector';
import { INotificationsState } from '../../store/notifications/state';
import { IWebsocketMainStreamState } from '../../store/websocketMainStream/state';
import { setLoadedAction, setPayloadAction } from '../../store/websocketMainStream/action';
import { TWebsocketMainStreamPayload } from '../../transport/websocket/streams/websocketMainStream';

const App = () => {
    const websocketMainStreamState = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    const notificationsState = useSelector<IStoreState, INotificationsState>((state) => state.notifications);
    const dispatch = useDispatch();
    useEffect(() => {
        if (websocketMainStreamState.loading) {
            Websocket()
                .then((socket: Socket) => {
                    dispatch(setLoadedAction());
                    socket.on('streamMain', (payload: TWebsocketMainStreamPayload) => {
                        dispatch(setPayloadAction(payload));
                    });
                })
                .catch((e: Error) => {
                    throw e;
                });
        }
    }, []);
    return <AppPage websocketMainStreamState={websocketMainStreamState} notificationsState={notificationsState} />;
};

export default App;
