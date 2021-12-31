import { Socket } from 'socket.io-client';
import Websocket from '../transport/websocket/websocket';
import { useEffect, useState } from 'react';

const useWebsocketSubscription = <T>(stream: string, timeout: number) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;
        const runTimeout = (socket: Socket) => {
            timer = setTimeout(() => {
                socket.removeAllListeners(stream);
                if (isLoading) setIsLoading(false);
                setData(null);
            }, 5000);
        };
        const cancelTimeout = () => {
            if (timer) clearTimeout(timer);
            if (isLoading) setIsLoading(false);
        };
        Websocket()
            .then((socket: Socket) => {
                timeout && runTimeout(socket);
                socket.on(stream, (payload: T) => {
                    cancelTimeout();
                    setData(payload);
                    timeout && runTimeout(socket);
                });
            })
            .catch((e: Error) => {
                console.error(e);
            });
        return () => {
            cancelTimeout();
            Websocket().then((socket) => {
                socket.removeAllListeners(stream);
            });
        };
    }, [stream, timeout]);
    return {
        isLoading,
        data
    };
};

export default useWebsocketSubscription;
