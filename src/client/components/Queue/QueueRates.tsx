import React, { useCallback, useEffect, useState } from 'react';
import useUrlParams from '../../hooks/useUrlParams';
import { Nav, Spinner } from 'react-bootstrap';
import TimeSeriesChart from '../common/TimeSeriesChart/TimeSeriesChart';
import {
    getQueueAcknowledgedTimeSeries,
    getQueueDeadLetteredTimeSeries,
    getQueuePublishedTimeSeries
} from '../../transport/http/api/time-series';

enum ENavigationTab {
    ACKNOWLEDGED = 'acknowledged',
    DEAD_LETTERED = 'dead-lettered',
    PUBLISHED = 'published'
}

const QueueRates: React.FC<{ namespace: string; queueName: string }> = ({ queueName, namespace }) => {
    const { getUrlParam, setUrlParam } = useUrlParams();
    const [activeTab, setActiveTab] = useState<ENavigationTab | null>(null);

    const FetchAcknowledgedTimeSeries = useCallback(
        (from: number, to: number) => () => getQueueAcknowledgedTimeSeries(namespace, queueName, from, to),
        [namespace, queueName]
    );

    const FetchDeadLetteredTimeSeries = useCallback(
        (from: number, to: number) => () => getQueueDeadLetteredTimeSeries(namespace, queueName, from, to),
        [namespace, queueName]
    );

    const FetchPublishedTimeSeries = useCallback(
        (from: number, to: number) => () => getQueuePublishedTimeSeries(namespace, queueName, from, to),
        [namespace, queueName]
    );

    useEffect(() => {
        setActiveTab(null);
        setTimeout(() => {
            const tab = getUrlParam('rates') ?? ENavigationTab.ACKNOWLEDGED;
            setActiveTab(tab as ENavigationTab);
        }, 250);
    }, [location.pathname]);

    useEffect(() => {
        const tab = getUrlParam('rates') ?? ENavigationTab.ACKNOWLEDGED;
        setActiveTab(tab as ENavigationTab);
    }, [location.search]);

    if (!activeTab) {
        return <Spinner animation={'border'} />;
    }

    return (
        <>
            <Nav variant="pills" className={'mb-4'}>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => setUrlParam('rates', ENavigationTab.ACKNOWLEDGED)}
                        active={activeTab === ENavigationTab.ACKNOWLEDGED}
                    >
                        Acknowledged
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => setUrlParam('rates', ENavigationTab.DEAD_LETTERED)}
                        active={activeTab === ENavigationTab.DEAD_LETTERED}
                    >
                        Dead-lettered
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => setUrlParam('rates', ENavigationTab.PUBLISHED)}
                        active={activeTab === ENavigationTab.PUBLISHED}
                    >
                        Published
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            {activeTab === ENavigationTab.ACKNOWLEDGED && (
                <TimeSeriesChart
                    label={`Acknowledged (queue ${queueName}@${namespace})`}
                    scale={'messages'}
                    stream={`streamQueueAcknowledged:${namespace}:${queueName}`}
                    FetchTimeSeriesRequestFactory={FetchAcknowledgedTimeSeries}
                />
            )}
            {activeTab === ENavigationTab.DEAD_LETTERED && (
                <TimeSeriesChart
                    label={`Dead-lettered (queue ${queueName}@${namespace})`}
                    scale={'messages'}
                    stream={`streamQueueDeadLettered:${namespace}:${queueName}`}
                    FetchTimeSeriesRequestFactory={FetchDeadLetteredTimeSeries}
                />
            )}
            {activeTab === ENavigationTab.PUBLISHED && (
                <TimeSeriesChart
                    label={`Published (queue ${queueName}@${namespace})`}
                    scale={'messages'}
                    stream={`streamQueuePublished:${namespace}:${queueName}`}
                    FetchTimeSeriesRequestFactory={FetchPublishedTimeSeries}
                />
            )}
        </>
    );
};

export default QueueRates;
