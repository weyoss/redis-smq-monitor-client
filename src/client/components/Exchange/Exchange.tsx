import React, { useCallback } from 'react';
import { RouteComponentProps } from 'react-router';
import { IExchangeRouteParams } from '../../routes/routes/exchange';
import ExchangePage from './ExchangePage';
import { getExchangeQueues } from '../../transport/http/api/exchanges';
import Query from '../common/Query';

const Exchange: React.FC<RouteComponentProps<IExchangeRouteParams>> = ({ match }) => {
    const { name } = match.params;
    const request = useCallback(() => getExchangeQueues(name), [name]);
    return (
        <Query request={request}>
            {({ state }) => <ExchangePage queues={state.data.data} exchange={name} />}
        </Query>
    );
}

export default Exchange;