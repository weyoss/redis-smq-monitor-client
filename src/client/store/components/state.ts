import { ILeftPanelState } from './LeftPanel/state';
import { IExchangeState } from './Exchange/state';

export interface IComponentsState {
    LeftPanel: ILeftPanelState;
    Exchange: IExchangeState;
}

export const initialComponentsState: IComponentsState = {
    LeftPanel: {
        Exchanges: {
            version: 0,
        }
    },
    Exchange: {
        version: 0,
    }
}