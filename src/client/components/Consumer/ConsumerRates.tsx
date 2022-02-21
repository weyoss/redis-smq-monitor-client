import React, { useCallback, useMemo } from 'react';
import useUrlParams from '../../hooks/useUrlParams';
import { Nav } from 'react-bootstrap';
import TimeSeriesChart from '../common/TimeSeriesChart/TimeSeriesChart';
import {
    getConsumerAcknowledgedTimeSeries,
    getConsumerDeadLetteredTimeSeries
} from '../../transport/http/api/time-series';

enum ENavigationTab {
    ACKNOWLEDGED = 'acknowledged',
    DEAD_LETTERED = 'dead-lettered'
}

const ConsumerRates: React.FC<{ namespace: string; queueName: string; consumerId: string }> = ({
    namespace,
    queueName,
    consumerId
}) => {
    const { getUrlParam, setUrlParam } = useUrlParams();

    const activeTab = useMemo(() => getUrlParam('rates') ?? ENavigationTab.ACKNOWLEDGED, [
        location.pathname,
        location.search
    ]);

    const FetchAcknowledgedTimeSeries = useCallback(
        (from: number, to: number) => () => getConsumerAcknowledgedTimeSeries(consumerId, from, to),
        [namespace, queueName, consumerId]
    );

    const FetchDeadLetteredTimeSeries = useCallback(
        (from: number, to: number) => () => getConsumerDeadLetteredTimeSeries(consumerId, from, to),
        [namespace, queueName, consumerId]
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
            </Nav>
            {activeTab === ENavigationTab.ACKNOWLEDGED && (
                <TimeSeriesChart
                    label={`Acknowledged (consumer ${consumerId})`}
                    scale={'messages'}
                    stream={`streamConsumerAcknowledged:${consumerId}`}
                    FetchTimeSeriesRequestFactory={FetchAcknowledgedTimeSeries}
                />
            )}
            {activeTab === ENavigationTab.DEAD_LETTERED && (
                <TimeSeriesChart
                    label={`Dead-lettered (consumer ${consumerId})`}
                    scale={'messages'}
                    stream={`streamConsumerDeadLettered:${consumerId}`}
                    FetchTimeSeriesRequestFactory={FetchDeadLetteredTimeSeries}
                />
            )}
        </>
    );
};

export default ConsumerRates;
