import React from 'react';
import RatesTable from '../common/RatesTable';
import RatesChart from '../common/RatesChart';
import ConsumerResourcesChart from './ConsumerResourcesChart';
import { IConsumer } from '../../types/IConsumer';
import { Table } from 'react-bootstrap';

interface IProps {
    consumer: IConsumer | undefined;
    queueName: string;
    namespace: string;
}

const ConsumerPage: React.FC<IProps> = ({ queueName, namespace, consumer }) => {
    if (!consumer) {
        return (
            <div>
                <h2>Consumer not found!</h2>
                <p>The consumer you are looking for does not exists or went offline.</p>
            </div>
        );
    }
    return (
        <>
            <h1 className={'display-4'}>Consumer Info</h1>
            <Table className={'table table-striped .consumers'} hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Queue</th>
                        <th>PID</th>
                        <th>Hostname</th>
                        <th>IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{consumer.id}</td>
                        <td>
                            {queueName}@{namespace}
                        </td>
                        <td>{consumer.resources.pid}</td>
                        <td>{consumer.resources.hostname}</td>
                        <td>{consumer.resources.ipAddress.join(', ') || 'NA'}</td>
                    </tr>
                </tbody>
            </Table>

            <h2>Rates</h2>
            <RatesChart rates={consumer?.rates} scope={`rates-consumer-${consumer.id}`} />
            <RatesTable rates={consumer?.rates} />

            <h2>RAM/CPU Usage</h2>
            <ConsumerResourcesChart consumer={consumer} />
        </>
    );
};

export default ConsumerPage;
