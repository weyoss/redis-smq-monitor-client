import React from 'react';

interface IExchangesPageProps {
    fanOuts: string[];
}

const List: React.FC<IExchangesPageProps> = ({ fanOuts }) => {
    if (!fanOuts.length) return <p>No fanout exchanges yet.</p>
    const items: React.ReactElement[] = [];
    for(const item of fanOuts) {
        items.push(<li key={`fanout-exchange-${item}`}>{item}</li>)
    }
    return (<ul>{items}</ul>)
}

export const ExchangesPage: React.FC<IExchangesPageProps> = ({ fanOuts }) => {
    return (
        <div className={'mb-4'}>
            <h2 className={'display-6'}>Exchanges</h2>
            <List fanOuts={fanOuts} />
        </div>
    )
}