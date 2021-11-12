import React from 'react';
import RatesTable from '../common/RatesTable';
import RatesChart from '../common/RatesChart';
import ConsumerResourcesChart from './ConsumerResourcesChart';
import { IConsumer } from '../../types/IConsumer';

interface IProps {
    consumer: IConsumer | undefined;
}

const ConsumerPage: React.FC<IProps> = ({ consumer }) => {
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
            <h2>ID: {consumer.id}</h2>
            <h3>Info</h3>
            <table className={'table .consumers'}>
                <thead className={'table-light'}>
                    <tr>
                        <th rowSpan={3}>PID</th>
                        <th rowSpan={3}>Hostname</th>
                        <th rowSpan={3}>IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{consumer.resources.pid}</td>
                        <td>{consumer.resources.hostname}</td>
                        <td>{consumer.resources.ipAddress.join(', ')}</td>
                    </tr>
                </tbody>
            </table>
            <h3>RAM/CPU Usage</h3>
            <ConsumerResourcesChart consumer={consumer} />
            <h3>Rates</h3>
            <RatesChart rates={consumer?.rates} />
            <RatesTable rates={consumer?.rates} />
        </>
    );
};

export default ConsumerPage;
