export interface IModalState {
    title: string;
    body: string;
    show: boolean;
    onConfirmation: () => void;
    onCancel: () => void;
}

export const initialModalState: IModalState = {
    show: false,
    title: '',
    body: '',
    onConfirmation: () => void 0,
    onCancel: () => void 0
};
