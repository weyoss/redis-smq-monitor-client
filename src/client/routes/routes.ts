import Overview from '../components/Overview';
import Queue from '../components/Queue';
import PageNotFound from '../components/common/Errors/PageNotFound';
import { generatePath, matchPath, RouteProps } from 'react-router';
import Consumer from '../components/Consumer';
import QueuePendingMessages from '../components/QueuePendingMessages';
import QueueAcknowledgedMessages from '../components/QueueAcknowledgedMessages';
import QueueDeadLetteredMessages from '../components/QueueDeadLetteredMessages';
import QueuePendingMessagesWithPriority from '../components/QueuePendingMessagesWithPriority';

export function matchRouteParams<T extends {}>(routeKey: keyof typeof routes, location: string) {
    const routeProps = routes[routeKey];
    const match = matchPath(location, routeProps);
    if (match) return match.params as T;
    return match;
}

export function matchRoute<T extends {}>(path: string) {
    for (const key in routes) {
        const routeProps = routes[key as keyof typeof routes];
        const match = matchPath(path, routeProps);
        if (match) return match;
    }
    return null;
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
    queuePendingMessagesWithPriority: {
        path: '/namespaces/:namespace/queues/:queueName/pending-messages-with-priority',
        exact: true,
        component: QueuePendingMessagesWithPriority,
        name: 'Pending messages with priority'
    },
    queueAcknowledgedMessages: {
        path: '/namespaces/:namespace/queues/:queueName/acknowledged-messages',
        exact: true,
        component: QueueAcknowledgedMessages,
        name: 'Acknowledged messages'
    },
    queueDeadLetteredMessages: {
        path: '/namespaces/:namespace/queues/:queueName/dead-lettered-messages',
        exact: true,
        component: QueueDeadLetteredMessages,
        name: 'Dead-lettered messages'
    },
    pageNotFound: {
        component: PageNotFound
    }
};

export default routes;
