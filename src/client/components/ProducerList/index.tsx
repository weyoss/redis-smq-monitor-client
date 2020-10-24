import React from 'react';
import { ProducersPropsInterface } from './contract';

const RenderList: React.FC<ProducersPropsInterface> = ({ producers }) => {
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
};

const ProducerList: React.FC<ProducersPropsInterface> = (props) => {
    return (
        <div className={'Producers margin-bottom'}>
            <RenderList {...props} />
        </div>
    );
};

export default ProducerList;
