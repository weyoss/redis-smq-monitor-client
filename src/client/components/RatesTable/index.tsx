import React from 'react';
import { ConsumerRates, ProducerRates, Rates } from '../../models/Rates';

const RatesTable: React.FC<{ rates: Rates | ConsumerRates | ProducerRates }> = ({ rates }) => {
    const { input = '-', processing = '-', acknowledged = '-', unacknowledged = '-' } = rates as Rates;
    return (
        <div className={'timeline'}>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>
                            Input
                            <br /> msg/sec
                        </th>
                        <th>
                            Processing
                            <br /> msg/sec
                        </th>
                        <th>
                            Acknowledged
                            <br /> msg/sec
                        </th>
                        <th>
                            Unacknowledged
                            <br /> msg/sec
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{input}</td>
                        <td>{processing}</td>
                        <td>{acknowledged}</td>
                        <td>{unacknowledged}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default RatesTable;
