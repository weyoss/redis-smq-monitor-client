import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { IExchangeRouteParams } from '../../routes/routes/exchange';
import ExchangePage from './ExchangePage';
import { getExchangeQueues } from '../../transport/http/api/exchanges';
import Query from '../common/Query';
import useSelector from '../../hooks/useSelector';
import { IStoreState } from '../../store/state';
import { IExchangeState } from '../../store/components/Exchange/state';

const Exchange: React.FC<RouteComponentProps<IExchangeRouteParams>> = ({ match }) => {
    const { version } = useSelector<IStoreState, IExchangeState>((state) => {
        return state.components.Exchange
    });
    const { name } = match.params;
    const request = useCallback(() => getExchangeQueues(name), [name]);
    return (
        <div key={version}>
            <Query request={request}>
                {({ state }) => <ExchangePage queues={state.data.data} exchangeName={name} />}
            </Query>
        </div>
    );
}

export default Exchange;