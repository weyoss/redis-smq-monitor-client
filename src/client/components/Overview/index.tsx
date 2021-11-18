import React from 'react';
import { IStoreState } from '../../store/state';
import OverviewPage from './OverviewPage';
import { IRates } from '../../types/IRates';
import { useSelector } from 'react-redux';

const Overview: React.FC = () => {
    const rates = useSelector<IStoreState, IRates>((state) => state.stats.rates);
    return <OverviewPage rates={rates} />;
};

export default Overview;
