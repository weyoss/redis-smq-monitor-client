'use strict';

import {Header, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import {Consumers} from "../Consumers";
import {Producers} from "../Producers";
import React from "react";

export const Queue = (props) => {
    if (!props.queue) {
        return <p>Please select a queue.</p>;
    }
    return (
        <div>
            <Header size='medium'>{`${props.queue.namespace}/${props.queue.name}`}</Header>
            <Table unstackable celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Size</TableHeaderCell>
                        <TableHeaderCell>Failed messages</TableHeaderCell>
                        <TableHeaderCell>Consumers</TableHeaderCell>
                        <TableHeaderCell>Producers</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>{props.queue.size}</TableCell>
                        <TableCell>{props.queue.erroredMessages}</TableCell>
                        <TableCell>{Object.keys(props.queue.consumers).length}</TableCell>
                        <TableCell>{Object.keys(props.queue.producers).length}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Consumers consumers={props.queue.consumers}/>
            <Producers producers={props.queue.producers}/>
        </div>
    )
};