import 'uplot/dist/uPlot.min.css';
import './style.css';

import React, { createRef, useEffect, useState } from 'react';
import UPlot, { AlignedData } from 'uplot';

export interface IUPlotLineChartProps {
    lines: IUPlotLineChartLine[];
    scope?: string;
    duration?: number;
}

export interface IUPlotLineChartLine {
    label: string;
    value: number;
    scale: string;
    color: string;
}

const initialState = (duration: number, totalLines: number): AlignedData => {
    const ts = Date.now() - duration;
    const d: AlignedData = [new Array(duration).fill(0).map((i, index) => ts + index)];
    for (let i = 0; i < totalLines; i += 1) {
        d.push(new Array(duration).fill(0));
    }
    return d;
};

const UplotLineChart: React.FC<IUPlotLineChartProps> = ({ lines, scope, duration = 300 }) => {
    const [timeline, updateTimeline] = useState<AlignedData>(initialState(duration, lines.length));
    const [uPlotInstance, setUPlotInstance] = useState<UPlot | null>(null);
    const plotRef = createRef<HTMLDivElement>();

    useEffect(() => {
        const htmlElement = plotRef.current!;
        const opts: UPlot.Options = {
            width: 0,
            height: 0,
            series: [
                {
                    points: {
                        show: false
                    }
                }
            ],
            axes: [{}]
        };
        if (lines.length) {
            lines.map((value) => {
                opts.series.push({
                    label: value.label,
                    stroke: value.color,
                    scale: value.scale,
                    points: {
                        show: false
                    },
                    spanGaps: false
                });
                if (opts.axes?.find((i) => i.scale === value.scale) === undefined) {
                    const side = opts.axes!.length === 2 ? 1 : 3;
                    opts.axes?.push({
                        scale: value.scale,
                        side,
                        grid: { show: side === 3 }
                    });
                }
            });
        }
        const instance = new UPlot(
            { ...opts, width: htmlElement.clientWidth, height: htmlElement.clientHeight - 50 },
            timeline,
            htmlElement
        );
        setUPlotInstance(instance);
    }, []);

    useEffect(() => {
        const [timestamp, ...rest] = timeline;
        timestamp.push(Math.round(Date.now() / 1000));
        timestamp.shift();
        lines.map((item, index) => {
            rest[index].push(item.value);
            rest[index].shift();
        });
        updateTimeline([timestamp, ...rest]);
    }, [lines]);

    useEffect(() => {
        updateTimeline(initialState(duration, lines.length));
    }, [scope]);

    useEffect(() => {
        uPlotInstance?.setData(timeline);
    }, [timeline]);

    useEffect(() => {
        const [ts, ...rest] = timeline;
        const diff = ts.length - duration;
        if (diff > 0) {
            const [xAxisData, ...rest] = timeline;
            const draft: AlignedData = [xAxisData.slice(diff)];
            rest.forEach((yAxisData) => draft.push(yAxisData.slice(diff)));
            updateTimeline(draft);
        } else if (diff < 0) {
            const start = ts[0] + diff;
            const newTS = new Array(-diff)
                .fill(0)
                .map((i, index) => start + index)
                .concat(ts);
            const draft = rest.map((value) => new Array(-diff).fill(0).concat(value));
            updateTimeline([newTS, ...draft]);
        }
    }, [duration]);

    useEffect(() => {
        if (uPlotInstance) {
            uPlotInstance.setSize({ width: 0, height: 0 });
            const holder = plotRef.current!.parentElement!;
            setTimeout(() => {
                const { clientWidth, clientHeight } = holder;
                uPlotInstance.setSize({ width: clientWidth, height: clientHeight - 50 });
            });
        }
    }, [window.innerWidth, window.innerHeight]);

    return (
        <div className={'chartContainer'}>
            <div style={{ width: '100%', overflow: 'hidden', height: '100%', position: 'relative' }} ref={plotRef} />
        </div>
    );
};

export default UplotLineChart;
