import { Rates } from '../../models/Rates';
import { Timeline } from '../../models/Timeline';

export interface TimelinePropsInterface {
    rates: Rates;
}

export interface TimelinePagePropsInterface {
    rates: Rates;
    timeline: Timeline;
}
