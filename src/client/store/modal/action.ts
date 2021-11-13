import { IModalState } from './state';

export enum EActionType {
    SHOW_MODAL = 'SHOW_MODAL',
    HIDE_MODAL = 'HIDE_MODAL'
}

export function showModalAction(params: IModalState) {
    return {
        type: EActionType.SHOW_MODAL,
        params
    };
}

export function hideModalAction() {
    return {
        type: EActionType.HIDE_MODAL
    };
}
