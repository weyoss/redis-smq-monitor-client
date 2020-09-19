import React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationStateInterface } from '../../store/contract';
import OverviewPage from './OverviewPage';
import { Rates } from '../../models/Rates';

const Overview: React.FC = () => {
    const rates = useSelector<ApplicationStateInterface, Rates>((state) => state.stats.rates);
    return <OverviewPage rates={rates} />;
};

export default Overview;
