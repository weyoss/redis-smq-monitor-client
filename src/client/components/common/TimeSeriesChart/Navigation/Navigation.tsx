import React, { ReactElement, useCallback, useState } from 'react';
import WindowSize, { EWindowSize } from './WindowSize';
import Scroll from './Scroll';

export interface INavigationProps {
    children(props: { state: INavigationState; setReady: () => void }): ReactElement;
}

export interface INavigationState {
    isLoading: boolean;
    windowSize: EWindowSize | null;
    offset: number;
    from: number;
    to: number;
}

const Navigation: React.FC<INavigationProps> = ({ children }) => {
    const [state, setState] = useState<INavigationState>({
        offset: 0,
        from: 0,
        to: 0,
        windowSize: null,
        isLoading: true
    });
    const setReady = useCallback(() => {
        setState((prevState) => {
            return {
                ...prevState,
                isLoading: false
            };
        });
    }, [state]);
    return (
        <>
            {<Scroll state={state} setNavigationState={setState} />}
            {children({ state, setReady })}
            {<WindowSize state={state} setNavigationState={setState} />}
        </>
    );
};

export default Navigation;
