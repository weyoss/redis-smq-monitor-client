import React, { useEffect, useState } from 'react';
import { TimelinePropsInterface } from './contract';
import TimelinePage from './TimelinePage';
import { Timeline } from '../../models/Timeline';

const Timeline: React.FC<TimelinePropsInterface> = ({ rates }) => {
    const [timeline, updateTimeline] = useState<Timeline>(
        new Array(60).fill({
            processing: 0,
            acknowledged: 0,
            unacknowledged: 0,
            input: 0
        })
    );
    useEffect(() => {
        const draft = timeline.map((i) => i);
        draft.push({ ...rates });
        draft.shift();
        updateTimeline(draft);
    }, [rates]);
    return <TimelinePage rates={rates} timeline={timeline} />;
};

export default Timeline;
