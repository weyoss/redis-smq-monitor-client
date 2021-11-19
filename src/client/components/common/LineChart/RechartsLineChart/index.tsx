import React, { useCallback, useEffect, useState } from 'react';
import { LineChart, CartesianGrid, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export interface IRechartChartProps {
    lines: TRechartChartPropsLines;
    duration?: number;
    leftYAxisLabel?: string;
    rightYAxisLabel?: string;
    xAxisLabel?: string;
    scope?: string;
    biaxial?: boolean;
}

export type TRechartChartPropsLines = { [key: string]: IRechartChartPropsLine };

export interface IRechartChartPropsLine {
    name: string;
    color: string;
    value: number;
    yAxisId?: 'left' | 'right';
}

const RechartsLineChart: React.FC<IRechartChartProps> = ({
    biaxial,
    scope,
    xAxisLabel,
    leftYAxisLabel,
    rightYAxisLabel,
    lines,
    duration = 300
}) => {
    const parseLineValues = useCallback((lines: TRechartChartPropsLines, init = false) => {
        const lineData: Record<string, number> = {};
        for (const key in lines) {
            const line = lines[key];
            lineData[key] = !init ? line.value : 0;
        }
        return lineData;
    }, []);

    const initialState = useCallback((duration: number, lines: TRechartChartPropsLines) => {
        const data: Record<string, number>[] = [];
        for (let i = 0; i < duration; i += 1) {
            data.push(parseLineValues(lines, true));
        }
        return data;
    }, []);

    const [timeline, setTimeline] = useState(initialState(duration, lines));

    const [hideYAxis, setHideYAxis] = useState(false);

    const resetTimeline = useCallback(() => {
        setTimeline(initialState(duration, lines));
    }, []);

    useEffect(() => resetTimeline(), [scope]);

    useEffect(() => {
        const draft = [...timeline];
        draft.push(parseLineValues(lines));
        draft.shift();
        setTimeline(draft);
        const hide = !timeline.find((i) => Object.values(i).filter((i) => i > 0).length);
        setHideYAxis(hide);
    }, [lines]);

    return (
        <ResponsiveContainer width="99%" height={300} className={'mb-4 mx-auto'}>
            <LineChart width={700} height={300} data={timeline} margin={{ top: 0, right: 0, left: 0, bottom: 10 }}>
                <XAxis hide={true} dataKey="name" label={xAxisLabel} />
                <YAxis yAxisId="left" hide={hideYAxis} label={leftYAxisLabel} />
                {biaxial && <YAxis yAxisId="right" orientation="right" hide={hideYAxis} label={rightYAxisLabel} />}
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                {Object.keys(lines).map((key: string, index) => (
                    <Line
                        yAxisId={lines[key].yAxisId ?? 'left'}
                        key={index}
                        type={'monotone'}
                        isAnimationActive={false}
                        dot={false}
                        dataKey={key}
                        stroke={lines[key].color}
                        name={lines[key].name}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RechartsLineChart;
