import React, { useEffect, useMemo } from 'react';
import {
    TWebsocketRateStream,
    TWebsocketRateStreamItem
} from '../../../transport/websocket/streams/websocketRateStream';
import UPlotChartEngine, { IUPlotChartProps } from './UPlotChartEngine';

const formatTimeSeries = (data: TWebsocketRateStream, label: string, scale: string) => {
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

const Chart: React.FC<{
    timeSeries: TWebsocketRateStream;
    scale: string;
    label: string;
    onReady: () => void;
}> = ({ timeSeries, scale, label, onReady }) => {
    const { lines, series } = useMemo(() => formatTimeSeries(timeSeries, label, scale), [timeSeries, scale, label]);
    useEffect(() => {
        onReady();
    }, []);
    return <UPlotChartEngine lines={lines} series={series} />;
};

export default Chart;
