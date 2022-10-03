export enum EActionType {
    RELOAD = 'RELOAD',
}

export function reloadAction() {
    return {
        type: EActionType.RELOAD,
    };
}
