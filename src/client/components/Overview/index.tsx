import React from 'react';
import { ApplicationStateInterface } from '../../store/contract';
import OverviewPage from './OverviewPage';
import { Rates } from '../../models/Rates';
import useSelector from '../../hooks/useSelector';

const Overview: React.FC = () => {
    const rates = useSelector<ApplicationStateInterface, Rates>((state) => state.stats.rates);
    return <OverviewPage rates={rates} />;
};

export default Overview;
