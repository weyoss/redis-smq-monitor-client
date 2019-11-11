'use strict';

import {Message, Header, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from "semantic-ui-react";
import React from "react";

export const Consumers = (props) => {

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function renderConsumers(consumersById) {
        const consumers = [];
        for(const id in consumersById) {
            const consumer = consumersById[id];
            consumers.push(
                <TableRow key={consumer.id}>
                    <TableCell>{consumer.id}</TableCell>
                    <TableCell>{consumer.rates.processing}</TableCell>
                    <TableCell>{consumer.rates.acknowledged}</TableCell>
                    <TableCell>{consumer.rates.unacknowledged}</TableCell>
                    <TableCell>{formatBytes(consumer.resources.ram.usage.rss)}</TableCell>
                    <TableCell>{formatBytes(consumer.resources.ram.free)}</TableCell>
                    <TableCell>{formatBytes(consumer.resources.ram.total)}</TableCell>
                    <TableCell>{consumer.resources.cpu.user}</TableCell>
                    <TableCell>{consumer.resources.cpu.system}</TableCell>
                </TableRow>
            )
        }

        if (!consumers.length) {
            return (<Message>No existing consumers yet.</Message>);
        }

        return (
            <Table unstackable celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell rowSpan={3}>ID</TableHeaderCell>
                        <TableHeaderCell rowSpan={3}>Processing <br/>msg/sec</TableHeaderCell>
                        <TableHeaderCell rowSpan={3}>Acks <br/>msg/sec</TableHeaderCell>
                        <TableHeaderCell rowSpan={3}>Unacks <br/>msg/sec</TableHeaderCell>
                        <TableHeaderCell colSpan={5}>Resources</TableHeaderCell>
                    </TableRow>
                    <TableRow>
                        <TableHeaderCell colSpan={3}>Memory</TableHeaderCell>
                        <TableHeaderCell colSpan={2}>CPU</TableHeaderCell>
                    </TableRow>
                    <TableRow>
                        <TableHeaderCell>Usage</TableHeaderCell>
                        <TableHeaderCell>Free</TableHeaderCell>
                        <TableHeaderCell>Total</TableHeaderCell>
                        <TableHeaderCell>User</TableHeaderCell>
                        <TableHeaderCell>System</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {consumers}
                </TableBody>
            </Table>
        )
    }

    return (
        <div className={'Consumers margin-bottom'}>
            <Header size='small'>Consumers</Header>
            {renderConsumers(props.consumers)}
        </div>
    )
};