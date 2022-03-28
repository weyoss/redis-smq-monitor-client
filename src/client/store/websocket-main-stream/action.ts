import { TWebsocketMainStreamPayload } from '../../transport/websocket/streams/websocketMainStream';

export enum EActionType {
    SET_LOADED = 'SET_LOADED',
    SET_PAYLOAD = 'SET_PAYLOAD'
}

export function setPayloadAction(payload: TWebsocketMainStreamPayload) {
    return {
        type: EActionType.SET_PAYLOAD,
        payload
    };
}

export function setLoadedAction() {
    return {
        type: EActionType.SET_LOADED
    };
}
