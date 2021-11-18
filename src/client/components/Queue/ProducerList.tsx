import React from 'react';
import { IProducerMap } from '../../types/IProducerMap';
import { Table } from 'react-bootstrap';

interface IProps {
    producers: IProducerMap;
}

const RenderList: React.FC<IProps> = ({ producers }) => {
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
        return <p>No producers yet.</p>;
    }
    return (
        <Table className="table table-striped" hover>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Published messages (msg/sec)</th>
                </tr>
            </thead>
            <tbody>{items}</tbody>
        </Table>
    );
};

const ProducerList: React.FC<IProps> = (props) => {
    return (
        <div className={'Producers margin-bottom'}>
            <RenderList {...props} />
        </div>
    );
};

export default ProducerList;
