import React from 'react';
import { ChartPagePropsInterface } from './contract';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from 'recharts';

import './style.css';

const ChartPage: React.FC<ChartPagePropsInterface> = ({ leftAxisLines, rightAxisLines, timeline }) => {
    return (
        <div className={'timeline'}>
            <div className={'chartContainer'}>
                <ResponsiveContainer width={'90%'} height={'100%'}>
                    <LineChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }} data={timeline}>
                        <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                        <Legend verticalAlign={'top'} height={36} align={'right'} />
                        <Text />
                        {leftAxisLines.map((i) => (
                            <Line
                                name={i.name}
                                type={'monotone'}
                                dataKey={i.dataKey}
                                stroke={i.color}
                                isAnimationActive={false}
                                yAxisId={'left'}
                            />
                        ))}
                        {rightAxisLines.map((i) => (
                            <Line
                                name={i.name}
                                type={'monotone'}
                                dataKey={i.dataKey}
                                stroke={i.color}
                                isAnimationActive={false}
                                yAxisId={'right'}
                            />
                        ))}
                        {leftAxisLines.length && <YAxis yAxisId="left" />}
                        {rightAxisLines.length && <YAxis yAxisId="right" orientation="right" />}
                        <XAxis dataKey={'na'} />
                        <CartesianGrid stroke="#ccc" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartPage;
