'use strict';

import React from 'react';
import {Header, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow} from 'semantic-ui-react'
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer} from "recharts";

import './Overview.css';

export class Overview extends React.Component {

    render() {
        return (
            <div className={'Overview'}>
                <Header size='large'>Overview</Header>
                <Table unstackable celled>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell>Input<br/> msgs/sec</TableHeaderCell>
                            <TableHeaderCell>Processing<br/> msgs/sec</TableHeaderCell>
                            <TableHeaderCell>Acknowledged<br/> msgs/sec</TableHeaderCell>
                            <TableHeaderCell>Unacknowledged<br/> msgs/sec</TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>{this.props.rates.input}</TableCell>
                            <TableCell>{this.props.rates.processing}</TableCell>
                            <TableCell>{this.props.rates.acknowledged}</TableCell>
                            <TableCell>{this.props.rates.unacknowledged}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <ResponsiveContainer width={'100%'} height={300}>
                    <LineChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }} data={this.props.timeline}>
                        <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                        <Legend verticalAlign="top" height={36}/>
                        <Line name={'Input (msg/sec)'} type={'monotone'} dataKey={'input'} stroke={'#f95951'} isAnimationActive={false}/>
                        <Line name={'Processing (msg/sec)'} type={'monotone'} dataKey={'processing'} stroke={'#0051ba'} isAnimationActive={false}/>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey={'na'} />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
};