import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

const wsURL = process.env.WS_URL as string;
let socket: Socket | null = null;

const WebSocket = () => {
    if (!socket) {
        socket = io(wsURL);
    }
    return {
        subscribeToStats(cb: Function) {
            socket?.on('stats', cb);
        }
    };
};

export default WebSocket;
