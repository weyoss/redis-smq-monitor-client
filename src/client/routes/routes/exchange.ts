import { ParameterizedRoute } from '../common';
import Exchange from '../../components/Exchange/Exchange';

export interface IExchangeRouteParams {
    name: string;
}

export const exchange = ParameterizedRoute<IExchangeRouteParams>({
    path: '/exchanges/:name',
    exact: true,
    component: Exchange,
    caption: 'Exchange'
});
