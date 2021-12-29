import React, { useCallback, useMemo } from 'react';
import useUrlParams from '../../hooks/useUrlParams';
import { Nav } from 'react-bootstrap';
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

    const activeTab = useMemo(() => getUrlParam('rates') ?? ENavigationTab.ACKNOWLEDGED, [
        location.pathname,
        location.search
    ]);

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
                    label={'Queue acknowledged'}
                    scale={'messages'}
                    stream={`streamQueueAcknowledged:${namespace}:${queueName}`}
                    FetchCharDataRequestFactory={FetchAcknowledgedTimeSeries}
                />
            )}
            {activeTab === ENavigationTab.DEAD_LETTERED && (
                <TimeSeriesChart
                    label={'Queue dead-lettered'}
                    scale={'messages'}
                    stream={`streamQueueDeadLettered:${namespace}:${queueName}`}
                    FetchCharDataRequestFactory={FetchDeadLetteredTimeSeries}
                />
            )}
            {activeTab === ENavigationTab.PUBLISHED && (
                <TimeSeriesChart
                    label={'Queue published'}
                    scale={'messages'}
                    stream={`streamQueuePublished:${namespace}:${queueName}`}
                    FetchCharDataRequestFactory={FetchPublishedTimeSeries}
                />
            )}
        </>
    );
};

export default QueueRates;
