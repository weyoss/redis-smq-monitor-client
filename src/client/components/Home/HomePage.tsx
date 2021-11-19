import React from 'react';
import RatesTable from '../common/RatesTable';
import RatesChart from '../common/RatesChart';
import { IRates } from '../../types/IRates';

interface IProps {
    rates: IRates;
}

const HomePage: React.FC<IProps> = ({ rates }) => {
    return (
        <>
            <h1 className={'display-4'}>Global Rates</h1>
            <p>
                The following metrics are gathered from all existing queues in the system. Select a specific queue from
                the queue listing, to view its metrics.
            </p>
            <RatesChart rates={rates} scope={'global-rates'} />
            <RatesTable rates={rates} />
        </>
    );
};

export default HomePage;
