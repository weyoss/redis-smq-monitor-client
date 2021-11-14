import React from 'react';
import { IApplicationState } from '../../store/contract';
import OverviewPage from './OverviewPage';
import { IRates } from '../../types/IRates';
import { useSelector } from 'react-redux';

const Overview: React.FC = () => {
    const rates = useSelector<IApplicationState, IRates>((state) => state.stats.rates);
    return <OverviewPage rates={rates} />;
};

export default Overview;
