import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import AppPage from './AppPage';
import Websocket from '../../transport/websocket/websocket';
import { useDispatch } from 'react-redux';
import { IStoreState } from '../../store/state';
import useSelector from '../../hooks/useSelector';
import { INotificationsState } from '../../store/notifications/state';
import { EWebsocketMainStreamStatus, IWebsocketMainStreamState } from '../../store/websocket-main-stream/state';
import { setLoadingAction, setPayloadAction } from '../../store/websocket-main-stream/action';
import { TWebsocketMainStreamPayload } from '../../transport/websocket/streams/mainStream';

const App = () => {
    const websocketMainStreamState = useSelector<IStoreState, IWebsocketMainStreamState>(
        (state) => state.websocketMainStream
    );
    const notificationsState = useSelector<IStoreState, INotificationsState>((state) => state.notifications);
    const dispatch = useDispatch();
    useEffect(() => {
        if (websocketMainStreamState.status === EWebsocketMainStreamStatus.INIT) {
            dispatch(setLoadingAction());
            Websocket()
                .then((socket: Socket) => {
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
