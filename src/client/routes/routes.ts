import Overview from '../components/Overview';
import Queue from '../components/Queue';
import PageNotFound from '../components/common/Errors/PageNotFound';
import { generatePath, matchPath, RouteProps } from 'react-router';
import Consumer from '../components/Consumer';
import QueuePendingMessages from '../components/QueuePendingMessages';

export function matchRouteParams<T extends {}>(routeKey: keyof typeof routes, location: string) {
    const routeProps = routes[routeKey];
    const match = matchPath(location, routeProps);
    if (match) return match.params as T;
    return match;
}

export function generateRoutePath(routeKey: keyof typeof routes, params: {}) {
    const routeProps = routes[routeKey] as RouteProps;
    return generatePath(routeProps.path as string, params);
}

const routes = {
    home: {
        path: '/',
        exact: true,
        component: Overview,
        name: 'Home'
    },
    queue: {
        path: '/namespaces/:namespace/queues/:queueName',
        exact: true,
        component: Queue,
        name: 'Queue'
    },
    consumer: {
        path: '/namespaces/:namespace/queues/:queueName/consumers/:consumerId',
        exact: true,
        component: Consumer,
        name: 'Consumer'
    },
    queuePendingMessages: {
        path: '/namespaces/:namespace/queues/:queueName/pending-messages',
        exact: true,
        component: QueuePendingMessages,
        name: 'Pending messages'
    },
    pageNotFound: {
        component: PageNotFound
    }
};

export default routes;
