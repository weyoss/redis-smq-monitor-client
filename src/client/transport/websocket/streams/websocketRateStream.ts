export type TWebsocketRateStream = TWebsocketRateStreamItem[];

export interface TWebsocketRateStreamItem {
    timestamp: number;
    value: number;
}
