export interface UPlotPropsInterface {
    data: UPlotDataType;
    scope?: string;
    duration?: number;
}

export interface UPlotDataItemInterface {
    label: string;
    value: number;
    scale: string;
    color: string;
}

export type UPlotDataType = UPlotDataItemInterface[];
