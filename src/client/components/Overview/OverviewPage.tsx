import React from 'react';
import { IOverviewPageProps } from './contract';
import RatesTable from '../common/RatesTable';
import RatesChart from '../common/RatesChart';

const OverviewPage: React.FC<IOverviewPageProps> = ({ rates }) => {
    return (
        <div className={'overview fullWidth'}>
            <h2>Global Rates</h2>
            <p>
                The following metrics are gathered from all existing queues in the system. Select a specific queue from
                the queue listing, to view its metrics.
            </p>
            <RatesChart rates={rates} />
            <RatesTable rates={rates} />
        </div>
    );
};

export default OverviewPage;
