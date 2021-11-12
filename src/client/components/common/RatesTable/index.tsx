import React from 'react';
import { IConsumerRates, IProducerRates, IRates } from '../../../types/IRates';

const RatesTable: React.FC<{ rates: IRates | IConsumerRates | IProducerRates }> = ({ rates }) => {
    const { input = '-', processing = '-', acknowledged = '-', unacknowledged = '-' } = rates as IRates;
    return (
        <div className={'timeline'}>
            <table className="table">
                <thead className="table-light">
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
