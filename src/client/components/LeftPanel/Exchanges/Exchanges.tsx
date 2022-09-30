import { ExchangesPage } from './ExchangesPage';
import React, { useCallback } from 'react';
import Query from '../../common/Query';
import { getExchanges } from '../../../transport/http/api/exchanges';

export const Exchanges = () => {
    const request = useCallback(() => getExchanges(), []);
    return (
        <Query request={request}>
            {({ state }) => <ExchangesPage fanOuts={state.data.data} />}
        </Query>
    );
}