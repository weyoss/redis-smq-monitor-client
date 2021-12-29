import React from 'react';
import { EScrollWindow } from './TimeSeriesChartPage';

export interface ITopControlBarProps {
    scrollWindow: EScrollWindow | null;
    setScrollWindow: (areaChartMode: EScrollWindow) => void;
}

const ScrollWindow: React.FC<ITopControlBarProps> = ({ scrollWindow, setScrollWindow }) => {
    return (
        <ul className="nav justify-content-center mb-2">
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${scrollWindow === EScrollWindow.M1 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setScrollWindow(EScrollWindow.M1)}
                >
                    1m
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${scrollWindow === EScrollWindow.M5 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setScrollWindow(EScrollWindow.M5)}
                >
                    5m
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${scrollWindow === EScrollWindow.M15 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setScrollWindow(EScrollWindow.M15)}
                >
                    15m
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${scrollWindow === EScrollWindow.M30 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setScrollWindow(EScrollWindow.M30)}
                >
                    30m
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${scrollWindow === EScrollWindow.H1 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => setScrollWindow(EScrollWindow.H1)}
                >
                    1h
                </button>
            </li>
        </ul>
    );
};

export default ScrollWindow;
