import React from 'react';
import { EScrollTo } from './TimeSeriesChartPage';

export interface INavigationProps {
    offset: number;
    scrollTo: (to: EScrollTo) => void;
}

const Navigation: React.FC<INavigationProps> = ({ offset, scrollTo }) => {
    return (
        <ul className="nav justify-content-center mb-2">
            <li className={`nav-item`}>
                <button className={`btn btn-sm btn-link`} type="button" onClick={() => scrollTo(EScrollTo.LEFT)}>
                    &larr; Scroll left
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${offset === 0 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => scrollTo(EScrollTo.RESET)}
                >
                    Live stream
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${offset === 0 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => scrollTo(EScrollTo.RIGHT)}
                >
                    Scroll right &rarr;
                </button>
            </li>
        </ul>
    );
};

export default Navigation;
