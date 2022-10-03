import React from 'react';
import { IMessageQueue } from '../../transport/http/api/common/IMessage';

interface IExchangePageProps {
    exchange: string;
    queues: IMessageQueue[];
}


const ExchangeQueues: React.FC<{ queues: IMessageQueue[]; }> = ({ queues }) => {
    if (!queues.length) {
        return <p>The exchange has not yet any bound queue.</p>
    }
    return (
        <div className={'exchange-queues'}>
        {
            queues.map((queue) => {
                return <div>l</div>
            })
        }
        </div>
    )
}

const ExchangePage: React.FC<IExchangePageProps> = ({ exchange, queues }) => {
    return <>
        <div className={'exchange fullWidth'}>
            <h1 className={'display-4'}>{exchange}</h1>
            <ExchangeQueues queues={queues} />
        </div>
    </>
}

export default ExchangePage;