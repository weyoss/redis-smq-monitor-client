'use strict';

import io from 'socket.io-client';

let socket = null;

export const websocket = () => {
    if (!socket) {
        socket = io();
    }
    return {
        subscribeToStats(cb) {
            socket.on('stats', cb);
        },
    };
};
