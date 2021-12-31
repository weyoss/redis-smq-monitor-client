import { Table } from 'react-bootstrap';
import { bytesToMB } from '../../../tools/utils';
import React from 'react';
import { TWebsocketHeartbeatStreamPayload } from '../../../transport/websocket/streams/websocketHeartbeatStream';

const HeartbeatData: React.FC<TWebsocketHeartbeatStreamPayload> = ({ data }) => {
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

export default HeartbeatData;
