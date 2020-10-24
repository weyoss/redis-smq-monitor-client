import { RouteComponentProps } from 'react-router';

export interface QueueRouteParamsInterface {
    queueName: string;
    namespace: string;
}

export interface ConsumerRouteParamsInterface extends QueueRouteParamsInterface {
    consumerId: string;
}

export type QueueRouteComponentProps = RouteComponentProps<QueueRouteParamsInterface>;
