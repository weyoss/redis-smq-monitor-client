import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Chart from './Chart';
import { TWebsocketRateStream } from '../../../transport/websocket/streams/websocketRateStream';
import Websocket from '../../../transport/websocket/websocket';
import { Socket } from 'socket.io-client';

export enum ELiveTimeSeriesLoadingProgress {
    CONNECTING,
    WAITING_FOR_DATA,
    DONE
}

export const LiveTimeSeries: React.FC<{
    stream: string;
    scale: string;
    label: string;
    onReady(): void;
}> = ({ stream, scale, label, onReady }) => {
    const [liveTimeSeries, setLiveTimeSeries] = useState<{
        progress: ELiveTimeSeriesLoadingProgress;
        payload: TWebsocketRateStream;
    }>({
        progress: ELiveTimeSeriesLoadingProgress.CONNECTING,
        payload: []
    });
    useEffect(() => {
        setLiveTimeSeries((prev) => {
            return {
                ...prev,
                progress: ELiveTimeSeriesLoadingProgress.CONNECTING
            };
        });
        Websocket()
            .then((socket: Socket) => {
                setLiveTimeSeries({
                    ...liveTimeSeries,
                    progress: ELiveTimeSeriesLoadingProgress.WAITING_FOR_DATA
                });
                socket.on(stream, (payload: { timestamp: number; value: number }[]) => {
                    setLiveTimeSeries((prev) => {
                        return {
                            ...prev,
                            progress: ELiveTimeSeriesLoadingProgress.DONE,
                            payload: payload
                        };
                    });
                });
            })
            .catch((e: Error) => {
                throw e;
            });
        return () => {
            Websocket().then((socket) => {
                socket.removeAllListeners(stream);
            });
        };
    }, [stream]);
    if (liveTimeSeries.progress !== ELiveTimeSeriesLoadingProgress.DONE) {
        const progress =
            liveTimeSeries.progress === ELiveTimeSeriesLoadingProgress.CONNECTING
                ? 'Connecting'
                : 'Waiting for live stream data';
        return (
            <>
                <span className={'me-4'}>{progress}...</span>
                <Spinner animation={'border'} />
            </>
        );
    }
    return <Chart timeSeries={liveTimeSeries.payload} scale={scale} label={label} onReady={onReady} />;
};
