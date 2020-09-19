import React from 'react';
import { TimelinePagePropsInterface } from './contract';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from 'recharts';

import './style.css';

const TimelinePage: React.FC<TimelinePagePropsInterface> = ({ rates, timeline }) => {
    const { input, processing, acknowledged, unacknowledged } = rates;
    return (
        <div className={'timeline'}>
            <div className={'chartContainer'}>
                <ResponsiveContainer width={'90%'} height={'100%'}>
                    <LineChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }} data={timeline}>
                        <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                        <Legend verticalAlign={'top'} height={36} align={'right'} />
                        <Text />
                        <Line
                            name={'Input'}
                            type={'monotone'}
                            dataKey={'input'}
                            stroke={'#1f78b4'}
                            isAnimationActive={false}
                        />
                        <Line
                            name={'Processing'}
                            type={'monotone'}
                            dataKey={'processing'}
                            stroke={'#e8a838'}
                            isAnimationActive={false}
                        />
                        <Line
                            name={'Acknowledged'}
                            type={'monotone'}
                            dataKey={'acknowledged'}
                            stroke={'#61cdbb'}
                            isAnimationActive={false}
                        />
                        <Line
                            name={'Unacknowledged'}
                            type={'monotone'}
                            dataKey={'unacknowledged'}
                            stroke={'#f47560'}
                            isAnimationActive={false}
                        />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey={'na'} />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
            </div>
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

export default TimelinePage;
