import React from 'react';
import { ConsumerPagePropsInterface } from './contract';
import RatesTable from '../RatesTable';
import RatesChart from '../RatesChart';
import ConsumerResourcesChart from '../ConsumerResourcesChart';

const ConsumerPage: React.FC<ConsumerPagePropsInterface> = ({ consumer }) => {
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
                <thead className={'thead-light'}>
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
