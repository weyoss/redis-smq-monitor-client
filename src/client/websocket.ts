import io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

const wsURL = process.env.WS_URL as string;
let socket: Socket | undefined;

const connect = async (): Promise<Socket> => {
    console.log('Trying to connect to WS server...');
    return new Promise((resolve, reject) => {
        const ws = io(wsURL);
        ws.once('connect', () => {
            console.log('Successfully connected to WS server.');
            resolve(ws);
        });
        ws.once('connect_error', (e: Error) => {
            console.error('An error occurred while trying to connect to WS server.');
            reject(e);
        });
    });
};

const websocket = {
    async init() {
        if (socket) {
            throw new Error('Already initialized.');
        }
        socket = await connect();
        return socket;
    },
    getSocket() {
        if (!socket) {
            throw new Error('WS has not yet been initialized.');
        }
        return socket;
    }
};

export default websocket;
