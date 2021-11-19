import React from 'react';
import { IStoreState } from '../../store/state';
import HomePage from './HomePage';
import { IRates } from '../../types/IRates';
import { useSelector } from 'react-redux';

const Home: React.FC = () => {
    const rates = useSelector<IStoreState, IRates>((state) => state.stats.rates);
    return <HomePage rates={rates} />;
};

export default Home;
