import React from 'react';
import * as routes from '../../../routes/routes';
import { Link } from 'react-router-dom';

interface IExchangesPageProps {
    fanOuts: string[];
    selectedExchange: string | undefined;
}

const List: React.FC<IExchangesPageProps> = ({ fanOuts, selectedExchange }) => {
    if (!fanOuts.length) return <p>No fanout exchanges yet.</p>
    const items: React.ReactElement[] = [];
    for(const name of fanOuts) {
        const className = selectedExchange === name ? 'active ' : '';
        items.push(
        <Link
            key={`fanout-exchange-${name}`}
            className={`${className}list-group-item list-group-item-action d-flex justify-content-between align-items-center`}
            to={routes.exchange.getLink({ name })}
        >{name}</Link>)
    }
    return (<div className={'list-group'}>{items}</div>)
}

export const ExchangesPage: React.FC<IExchangesPageProps> = (props) => {
    return (
        <div className={'mb-4'}>
            <h2 className={'display-6'}>Exchanges</h2>
            <List {...props} />
        </div>
    )
}