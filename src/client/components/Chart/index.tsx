import React, { useEffect, useState } from 'react';
import { DataInterface, ChartPropsInterface } from './contract';
import ChartPage from './ChartPage';

const initialState = (data: any) => {
    const value = Object.keys(data).reduce((acc: any, cur: string) => {
        acc[cur] = 0;
        return acc;
    }, {});
    return new Array(60).fill(value) as DataInterface[];
};

const Chart: React.FC<ChartPropsInterface> = ({ leftAxisLines = [], rightAxisLines = [], data, scope }) => {
    const [timeline, updateTimeline] = useState<DataInterface[]>(initialState(data));
    useEffect(() => {
        const draft = timeline.map((i) => i);
        draft.push({ ...data });
        draft.shift();
        updateTimeline(draft);
    }, [data]);
    useEffect(() => {
        updateTimeline(initialState(data));
    }, [scope]);
    return <ChartPage leftAxisLines={leftAxisLines} rightAxisLines={rightAxisLines} timeline={timeline} />;
};

export default Chart;
