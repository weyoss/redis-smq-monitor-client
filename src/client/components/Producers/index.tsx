import React from 'react';
import { ProducersPropsInterface } from './contract';
import { Producers } from '../../models/producers';

function render(producers: Producers) {
    const items = [];
    for (const id in producers) {
        const producer = producers[id];
        items.push(
            <tr key={producer.id}>
                <td scope={'row'}>{producer.id}</td>
                <td>{producer.rates.input}</td>
            </tr>
        );
    }
    if (!items.length) {
        return <p>No queue producers yet.</p>;
    }
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Published messages (msg/sec)</th>
                </tr>
            </thead>
            <tbody>{items}</tbody>
        </table>
    );
}

const Producers: React.FC<ProducersPropsInterface> = ({ producers }) => {
    return (
        <div className={'Producers margin-bottom'}>
            <h3>Producers</h3>
            {render(producers)}
        </div>
    );
};

export default Producers;
