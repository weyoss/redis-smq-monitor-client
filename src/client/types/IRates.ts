export interface IConsumerRates {
    processing: number;
    acknowledged: number;
    unacknowledged: number;
}

export interface IProducerRates {
    input: number;
}

export type IRates = IConsumerRates & IProducerRates;
