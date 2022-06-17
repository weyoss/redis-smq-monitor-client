import { TWebsocketMainStreamPayload } from '../../transport/websocket/streams/websocketMainStream';

export enum EActionType {
    SET_LOADING = 'SET_LOADING',
    SET_PAYLOAD = 'SET_PAYLOAD'
}

export function setPayloadAction(payload: TWebsocketMainStreamPayload) {
    return {
        type: EActionType.SET_PAYLOAD,
        payload
    };
}

export function setLoadingAction() {
    return {
        type: EActionType.SET_LOADING
    };
}
