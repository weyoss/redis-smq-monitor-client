import { Table } from 'react-bootstrap';
import { bytesToMB } from '../../tools/utils';
import React from 'react';
import { TConsumerHeartbeatStreamPayload } from '../../transport/websocket/streams/consumerHeartbeatStream';

const ConsumerResourcesUsage: React.FC<TConsumerHeartbeatStreamPayload> = ({ data }) => {
    return (
        <>
            <p>
                Note: Sometimes the CPU usage is not accurate and does not match the real CPU usage. Therefore it should
                be regarded just as an indicative value.
            </p>
            <Table className={'table table-striped'} hover>
                <thead>
                    <tr>
                        <th scope="col">RAM (RSS, MB)</th>
                        <th scope="col">CPU Usage (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{bytesToMB(data.ram.usage.rss)}</td>
                        <td>{data.cpu.percentage}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default ConsumerResourcesUsage;
