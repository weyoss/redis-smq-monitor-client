import { RouteComponentProps } from 'react-router';
import { ConsumerRouteParamsInterface } from '../../routes/contract';
import { Consumer } from '../../models/Consumer';

export interface ConsumerPropsInterface extends RouteComponentProps<ConsumerRouteParamsInterface> {}

export interface ConsumerPagePropsInterface {
    consumer: Consumer | undefined;
}
