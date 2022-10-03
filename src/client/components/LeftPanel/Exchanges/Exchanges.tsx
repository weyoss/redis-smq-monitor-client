import { ExchangesPage } from './ExchangesPage';
import React, { useCallback } from 'react';
import Query from '../../common/Query';
import { getExchanges } from '../../../transport/http/api/exchanges';
import { useParams } from '../../../hooks/useParams';
import { exchange } from '../../../routes/routes';
import { IExchangeRouteParams } from '../../../routes/routes/exchange';
import useSelector from '../../../hooks/useSelector';
import { IStoreState } from '../../../store/state';
import { IExchangesState } from '../../../store/components/LeftPanel/Exchanges/state';

export const Exchanges = () => {
    const { version } = useSelector<IStoreState, IExchangesState>((state) => {
        return state.components.LeftPanel.Exchanges
    });
    const request = useCallback(() => getExchanges(), []);
    const matchedParams: Partial<IExchangeRouteParams> = useParams(exchange.path);
    return (
        <div key={version}>
            <Query request={request}>
                {({ state }) => <ExchangesPage fanOuts={state.data.data} selectedExchange={matchedParams.name} />}
            </Query>
        </div>
    );
}

export default Exchanges;