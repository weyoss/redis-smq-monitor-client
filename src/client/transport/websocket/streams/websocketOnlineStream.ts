export type TWebsocketOnlineStreamPayload = {
    [id: string]: TWebsocketOnlineStreamPayloadData;
};

export type TWebsocketOnlineStreamPayloadData = {
    ipAddress: string[];
    hostname: string;
    pid: number;
    createdAt: number;
}