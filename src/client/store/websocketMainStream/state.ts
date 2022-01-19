import { TWebsocketMainStreamPayload } from '../../transport/websocket/streams/websocketMainStream';

export interface IWebsocketMainStreamState {
    loading: boolean;
    payload: TWebsocketMainStreamPayload;
}

export const initialWebsocketMainStreamState: IWebsocketMainStreamState = {
    loading: true,
    payload: {
        consumersCount: 0,
        queuesCount: 0,
        pendingMessagesWithPriorityCount: 0,
        pendingMessagesCount: 0,
        deadLetteredMessagesCount: 0,
        scheduledMessagesCount: 0,
        acknowledgedMessagesCount: 0,
        queues: {}
    }
};
