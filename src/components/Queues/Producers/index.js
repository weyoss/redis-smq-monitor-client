'use strict';

import {Message, Header, Table, TableBody, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import React from "react";

export const Producers = (props) => {

    function renderProducers(producersById) {
        const producers = [];
        for(const id in producersById) {
            const producer = producersById[id];
            producers.push(
                <tr key={producer.id}>
                    <td>{producer.id}</td>
                    <td>{producer.rates.input}</td>
                </tr>
            );
        }
        if (!producers.length) {
            return (<Message>No queue producers yet.</Message>);
        }
        return (
            <Table unstackable celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Published messages (msg/sec)</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {producers}
                </TableBody>
            </Table>
        )
    }

    return (
        <div className={'Producers margin-bottom'}>
            <Header size='small'>Producers</Header>
            {renderProducers(props.producers)}
        </div>
    );
};
