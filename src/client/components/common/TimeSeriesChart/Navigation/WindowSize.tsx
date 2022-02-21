import React, { useCallback } from 'react';
import { INavigationState } from './Navigation';

export interface IWindowSizeProps {
    state: INavigationState;
    setNavigationState: React.Dispatch<React.SetStateAction<INavigationState>>;
}

export enum EWindowSize {
    M1 = 60,
    M5 = 5 * 60,
    M15 = 15 * 60,
    M30 = 30 * 60,
    H1 = 60 * 60
}

const WindowSize: React.FC<IWindowSizeProps> = ({ state, setNavigationState }) => {
    const setWindowSize = useCallback(
        (window: EWindowSize) => {
            setNavigationState((prev) => {
                return {
                    ...prev,
                    windowSize: window
                };
            });
        },
        [state]
    );
    if (state.isLoading) {
        return <></>;
    }
    return (
        <ul className="nav justify-content-center mb-2">
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${state.windowSize === EWindowSize.M1 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setWindowSize(EWindowSize.M1)}
                >
                    1m
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${state.windowSize === EWindowSize.M5 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setWindowSize(EWindowSize.M5)}
                >
                    5m
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${state.windowSize === EWindowSize.M15 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setWindowSize(EWindowSize.M15)}
                >
                    15m
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${state.windowSize === EWindowSize.M30 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setWindowSize(EWindowSize.M30)}
                >
                    30m
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${state.windowSize === EWindowSize.H1 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setWindowSize(EWindowSize.H1)}
                >
                    1h
                </button>
            </li>
        </ul>
    );
};

export default WindowSize;
