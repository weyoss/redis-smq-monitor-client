import { TWebsocketMainStreamPayload } from '../../transport/websocket/streams/websocketMainStream';


export enum EWebsocketMainStreamStatus {
    INIT,
    LOADING,
    LOADED,
}

export interface IWebsocketMainStreamState {
    status: EWebsocketMainStreamStatus;
    payload: TWebsocketMainStreamPayload;
}

export const initialWebsocketMainStreamState: IWebsocketMainStreamState = {
    status: EWebsocketMainStreamStatus.INIT,
    payload: {
        consumersCount: 0,
        queuesCount: 0,
        pendingMessagesCount: 0,
        deadLetteredMessagesCount: 0,
        scheduledMessagesCount: 0,
        acknowledgedMessagesCount: 0,
        queues: {}
    }
};
