import React, { useMemo } from 'react';
import { TQueryRequest } from '../../../hooks/useQuery';
import { TGetTimeSeriesHTTPResponse } from '../../../transport/http/api/time-series';
import Navigation from './Navigation/Navigation';
import { LiveTimeSeries } from './LiveTimeSeries';
import { QueryTimeSeries } from './QueryTimeSeries';

export interface ITimeSeriesChartProps {
    label: string;
    scale: string;
    stream: string;
    FetchTimeSeriesRequestFactory: (from: number, to: number) => TQueryRequest<TGetTimeSeriesHTTPResponse>;
}

const TimeSeriesChart: React.FC<ITimeSeriesChartProps> = ({ label, scale, stream, FetchTimeSeriesRequestFactory }) => {
    return (
        <div className={'mb-4'}>
            <Navigation>
                {({ state, setReady }) => {
                    return useMemo(() => {
                        if (state.offset === 0) {
                            return <LiveTimeSeries stream={stream} scale={scale} label={label} onReady={setReady} />;
                        }
                        return (
                            <QueryTimeSeries
                                RequestFactory={FetchTimeSeriesRequestFactory}
                                scale={scale}
                                label={label}
                                from={state.from}
                                to={state.to}
                                onReady={setReady}
                            />
                        );
                    }, [label, scale, stream, state.offset, state.from, state.to]);
                }}
            </Navigation>
        </div>
    );
};

export default TimeSeriesChart;
