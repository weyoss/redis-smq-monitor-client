export interface DataInterface {
    [key: string]: number;
}

export interface LineInterface {
    name: string;
    color: string;
    dataKey: string;
}

export interface ChartPropsInterface {
    leftAxisLines?: LineInterface[];
    rightAxisLines?: LineInterface[];
    data: DataInterface;
    scope?: string;
}

export interface ChartPagePropsInterface {
    leftAxisLines: LineInterface[];
    rightAxisLines: LineInterface[];
    timeline: DataInterface[];
}
