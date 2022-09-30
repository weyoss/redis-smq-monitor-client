import { ExchangesPage } from './ExchangesPage';
import React, { useCallback } from 'react';
import Query from '../../common/Query';
import { getExchanges } from '../../../transport/http/api/exchanges';
import { useParams } from '../../../hooks/useParams';
import { exchange } from '../../../routes/routes';
import { IExchangeRouteParams } from '../../../routes/routes/exchange';

export const Exchanges = () => {
    const request = useCallback(() => getExchanges(), []);
    const matchedParams: Partial<IExchangeRouteParams> = useParams(exchange.path);
    return (
        <Query request={request}>
            {({ state }) => <ExchangesPage fanOuts={state.data.data} selectedExchange={matchedParams.name} />}
        </Query>
    );
}

export default Exchanges;