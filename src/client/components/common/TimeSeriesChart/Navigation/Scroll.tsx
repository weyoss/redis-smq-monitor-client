import React, { useCallback, useEffect } from 'react';
import { INavigationState } from './Navigation';
import { EWindowSize } from './WindowSize';

export enum ENavigationScrollDirection {
    RESET,
    LEFT,
    RIGHT
}

const Scroll: React.FC<{
    state: INavigationState;
    setNavigationState: React.Dispatch<React.SetStateAction<INavigationState>>;
}> = ({ state, setNavigationState }) => {
    const scrollTo = useCallback(
        (direction: ENavigationScrollDirection, scrollWindow?: EWindowSize) => {
            setNavigationState((prev) => {
                return {
                    ...prev,
                    isLoading: true
                };
            });
            if (direction === ENavigationScrollDirection.RESET) {
                setNavigationState((prev) => {
                    return {
                        ...prev,
                        offset: 0,
                        to: 0,
                        from: 0,
                        windowSize: null
                    };
                });
            } else {
                const window = scrollWindow || state.windowSize || EWindowSize.M1;
                const useOffset = scrollWindow ? 0 : state.offset;
                const scrollBy = window * (direction === ENavigationScrollDirection.RIGHT ? 1 : -1);
                const offset = useOffset + scrollBy;
                if (offset >= 0) {
                    setNavigationState((prev) => {
                        return {
                            ...prev,
                            offset: 0,
                            to: 0,
                            from: 0,
                            windowSize: null
                        };
                    });
                } else {
                    let from: number, to: number;
                    const useTo = scrollWindow ? 0 : state.to;
                    const useFrom = scrollWindow ? 0 : state.from;
                    if (direction === ENavigationScrollDirection.RIGHT) {
                        from = useTo;
                        to = useTo + scrollBy;
                    } else {
                        to = useFrom > 0 ? useFrom : Math.ceil(Date.now() / 1000);
                        from = to + scrollBy;
                    }
                    setNavigationState((prev) => {
                        return {
                            ...prev,
                            offset,
                            windowSize: window,
                            from,
                            to
                        };
                    });
                }
            }
        },
        [state]
    );
    useEffect(() => {
        if (state.windowSize) {
            scrollTo(ENavigationScrollDirection.LEFT, state.windowSize);
        }
    }, [state.windowSize]);
    if (state.isLoading) {
        return <></>;
    }
    return (
        <ul className="nav justify-content-center mb-2">
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link`}
                    type="button"
                    onClick={() => scrollTo(ENavigationScrollDirection.LEFT)}
                >
                    &larr; Scroll left
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${state.offset === 0 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => scrollTo(ENavigationScrollDirection.RESET)}
                >
                    Live stream
                </button>
            </li>
            <li className={`nav-item`}>
                <button
                    className={`btn btn-sm btn-link ${state.offset === 0 ? 'disabled' : ''}`}
                    type="button"
                    onClick={() => scrollTo(ENavigationScrollDirection.RIGHT)}
                >
                    Scroll right &rarr;
                </button>
            </li>
        </ul>
    );
};

export default Scroll;
