import React, { useEffect, useState } from 'react';
import { TimelinePropsInterface } from './contract';
import TimelinePage from './TimelinePage';
import { Timeline } from '../../models/Timeline';

const initialState = () =>
    new Array(60).fill({
        processing: 0,
        acknowledged: 0,
        unacknowledged: 0,
        input: 0
    });

const Timeline: React.FC<TimelinePropsInterface> = ({ rates, scope }) => {
    const [timeline, updateTimeline] = useState<Timeline>(initialState());
    useEffect(() => {
        const draft = timeline.map((i) => i);
        draft.push({ ...rates });
        draft.shift();
        updateTimeline(draft);
    }, [rates]);
    useEffect(() => {
        updateTimeline(initialState());
    }, [scope]);
    return <TimelinePage rates={rates} timeline={timeline} />;
};

export default Timeline;
