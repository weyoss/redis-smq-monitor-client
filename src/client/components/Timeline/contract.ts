import { Rates } from '../../models/Rates';
import { Timeline } from '../../models/Timeline';

export interface TimelinePropsInterface {
    rates: Rates;
    scope?: string;
}

export interface TimelinePagePropsInterface {
    rates: Rates;
    timeline: Timeline;
}
