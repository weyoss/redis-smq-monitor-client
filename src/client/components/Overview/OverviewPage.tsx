import React from 'react';
import { OverviewPagePropsInterface } from './contract';
import RatesTable from '../RatesTable';
import RatesChart from '../RatesChart';

const OverviewPage: React.FC<OverviewPagePropsInterface> = ({ rates }) => {
    return (
        <div className={'overview fullWidth'}>
            <h2>Global MQ Overview</h2>
            <p>
                The following metrics are gathered from all existing queues in the system. Select a specific queue from
                the queue listing, to view its metrics.
            </p>
            <hr />
            <RatesChart rates={rates} />
            <RatesTable rates={rates} />
        </div>
    );
};

export default OverviewPage;
