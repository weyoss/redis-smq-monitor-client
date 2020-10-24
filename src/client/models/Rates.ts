export interface ConsumerRates {
    processing: number;
    acknowledged: number;
    unacknowledged: number;
}

export interface ProducerRates {
    input: number;
}

export type Rates = ConsumerRates & ProducerRates;
