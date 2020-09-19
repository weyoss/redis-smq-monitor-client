import Timeline from '../Timeline';
import React from 'react';
import { OverviewPagePropsInterface } from './contract';

const OverviewPage: React.FC<OverviewPagePropsInterface> = ({ rates }) => {
    return (
        <div className={'overview fullWidth'}>
            <h2>Global MQ Overview</h2>
            <p>
                The following metrics are gathered from all existing queues in the system. Select a specific queue from
                the queue listing, to view its metrics.
            </p>
            <hr />
            <Timeline rates={rates} />
        </div>
    );
};

export default OverviewPage;
