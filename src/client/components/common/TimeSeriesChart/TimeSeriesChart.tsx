import React, { useCallback, useEffect, useState } from 'react';
import { TWebsocketRateStream } from '../../../transport/websocket/streams/websocketRateStream';
import Websocket from '../../../transport/websocket/websocket';
import { Socket } from 'socket.io-client';
import TimeSeriesChartPage from './TimeSeriesChartPage';
import { TQueryRequest } from '../../../hooks/useQuery';
import { TGetTimeSeriesHTTPResponse } from '../../../transport/http/api/time-series';

interface IChartProps {
    label: string;
    scale: string;
    stream: string;
    FetchCharDataRequestFactory: (from: number, to: number) => TQueryRequest<TGetTimeSeriesHTTPResponse>;
}

const TimeSeriesChart: React.FC<IChartProps> = ({ label, scale, stream, FetchCharDataRequestFactory }) => {
    const [liveTimeSeries, setLiveTimeSeries] = useState<{
        isLoading: boolean;
        isSubscribed: boolean;
        payload: TWebsocketRateStream;
    }>({
        isLoading: true,
        isSubscribed: true,
        payload: []
    });

    const unsubscribe = useCallback(() => {
        setLiveTimeSeries((prev) => {
            return {
                ...prev,
                isSubscribed: false
            };
        });
    }, [stream, liveTimeSeries]);

    const subscribe = useCallback(() => {
        setLiveTimeSeries((prev) => {
            return {
                ...prev,
                isSubscribed: true,
                isLoading: true
            };
        });
    }, [stream, liveTimeSeries]);

    useEffect(() => {
        if (liveTimeSeries.isSubscribed) {
            Websocket()
                .then((socket: Socket) => {
                    socket.on(stream, (payload: { timestamp: number; value: number }[]) => {
                        setLiveTimeSeries((prev) => {
                            return {
                                ...prev,
                                isLoading: false,
                                payload: payload
                            };
                        });
                    });
                })
                .catch((e: Error) => {
                    throw e;
                });
        } else {
            Websocket().then((socket) => {
                socket.removeAllListeners(stream);
            });
        }
        return () => {
            if (liveTimeSeries.isSubscribed) {
                Websocket().then((socket) => {
                    socket.removeAllListeners(stream);
                });
            }
        };
    }, [stream, liveTimeSeries.isSubscribed]);

    return (
        <TimeSeriesChartPage
            label={label}
            scale={scale}
            liveTimeSeries={liveTimeSeries}
            FetchDataRequestFactory={FetchCharDataRequestFactory}
            subscribe={subscribe}
            unsubscribe={unsubscribe}
        />
    );
};

export default TimeSeriesChart;
