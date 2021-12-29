import { Spinner } from 'react-bootstrap';
import Query from '../Query';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ScrollWindow from './ScrollWindow';
import { TQueryRequest } from '../../../hooks/useQuery';
import Navigation from './Navigation';
import { TGetTimeSeriesHTTPResponse } from '../../../transport/http/api/time-series';
import {
    TWebsocketRateStream,
    TWebsocketRateStreamItem
} from '../../../transport/websocket/streams/websocketRateStream';
import UPlotChartEngine, { IUPlotChartProps } from './UPlotChartEngine';

export enum EScrollWindow {
    M1 = 60,
    M5 = 5 * 60,
    M15 = 15 * 60,
    M30 = 30 * 60,
    H1 = 60 * 60
}

export enum EScrollTo {
    RESET,
    LEFT,
    RIGHT
}

interface IChartPageProps {
    liveTimeSeries: { isLoading: boolean; payload: TWebsocketRateStream };
    FetchDataRequestFactory(from: number, to: number): TQueryRequest<TGetTimeSeriesHTTPResponse>;
    subscribe(): void;
    unsubscribe(): void;
    label: string;
    scale: string;
}

const TimeSeriesChartPage: React.FC<IChartPageProps> = ({
    subscribe,
    unsubscribe,
    FetchDataRequestFactory,
    liveTimeSeries,
    label,
    scale
}) => {
    const [scroll, setScroll] = useState<{
        offset: number;
        window: EScrollWindow | null;
        from: number;
        to: number;
    }>({ offset: 0, from: 0, to: 0, window: null });

    const scrollTo = useCallback(
        (to: EScrollTo) => {
            const window = scroll.window ?? EScrollWindow.M1;
            if (to === EScrollTo.RESET) {
                setScroll((prev) => {
                    return {
                        ...prev,
                        offset: 0,
                        currentTimestamp: 0,
                        to: 0,
                        from: 0,
                        window
                    };
                });
                subscribe();
            } else {
                const scrollBy = window * (to === EScrollTo.RIGHT ? 1 : -1);
                const offset = scroll.offset + scrollBy;
                if (offset >= 0) {
                    setScroll((prev) => {
                        return {
                            ...prev,
                            offset: 0,
                            to: 0,
                            from: 0,
                            window
                        };
                    });
                    subscribe();
                } else {
                    let fromTimestamp: number, toTimestamp: number;
                    if (to === EScrollTo.RIGHT) {
                        fromTimestamp = scroll.to;
                        toTimestamp = scroll.to + scrollBy;
                    } else {
                        const from = scroll.from > 0 ? scroll.from : Math.ceil(Date.now() / 1000);
                        fromTimestamp = from + scrollBy;
                        toTimestamp = from;
                    }
                    setScroll({
                        ...scroll,
                        offset,
                        window,
                        from: fromTimestamp,
                        to: toTimestamp
                    });
                    unsubscribe();
                }
            }
        },
        [scroll]
    );

    const setScrollWindow = useCallback(
        (window: EScrollWindow) => {
            setScroll({
                window,
                offset: 0,
                from: 0,
                to: 0
            });
        },
        [scroll]
    );

    useEffect(() => {
        if (scroll.window !== null) scrollTo(EScrollTo.LEFT);
    }, [scroll.window]);

    const request = useMemo(() => FetchDataRequestFactory(scroll.from, scroll.to), [scroll.from, scroll.to]);

    const formatTimeSeries = (data: TWebsocketRateStream) => {
        const formatted: IUPlotChartProps = {
            lines: [],
            series: [[]]
        };
        const lineData: number[] = [];
        data.forEach((i: TWebsocketRateStreamItem) => {
            formatted.series[0].push(i.timestamp);
            lineData.push(i.value);
        });
        formatted.series.push(lineData);
        formatted.lines.push({
            color: '#0c5efe',
            fill: '#0ca7fe',
            scale,
            label
        });
        return formatted;
    };

    return (
        <div className={'mb-4'}>
            <Navigation offset={scroll.offset} scrollTo={scrollTo} />
            {scroll.offset === 0 ? (
                liveTimeSeries.isLoading ? (
                    <Spinner animation={'border'} />
                ) : (
                    (() => {
                        const { lines, series } = formatTimeSeries(liveTimeSeries.payload);
                        return <UPlotChartEngine lines={lines} series={series} />;
                    })()
                )
            ) : (
                <Query request={request}>
                    {({ state }) => {
                        const { lines, series } = formatTimeSeries(state.data.data);
                        return <UPlotChartEngine lines={lines} series={series} />;
                    }}
                </Query>
            )}
            <ScrollWindow scrollWindow={scroll.window} setScrollWindow={setScrollWindow} />
        </div>
    );
};

export default TimeSeriesChartPage;
