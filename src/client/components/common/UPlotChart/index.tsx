import React, { createRef, useEffect, useState } from 'react';
import uPlot from 'uplot';
import { UPlotPropsInterface } from './contract';

import 'uplot/dist/uPlot.min.css';
import './style.css';

const now = () => Math.round(Date.now() / 1000);

const initialState = (duration: number, totalLines: number) => {
    const ts = now() - duration;
    const linesData = new Array(totalLines).fill(null).map(() => new Array(duration).fill(0));
    return [new Array(duration).fill(0).map((i, index) => ts + index)].concat(linesData);
};

const UplotChart: React.FC<UPlotPropsInterface> = ({ data, scope, duration = 1800 }) => {
    const [timeline, updateTimeline] = useState(initialState(duration, data.length));
    const [uPlotInstance, setUPlotInstance] = useState<uPlot | null>(null);
    const plotRef = createRef<HTMLDivElement>();

    useEffect(() => {
        const htmlElement = plotRef.current!;
        const opts: uPlot.Options = {
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
        if (data.length) {
            data.map((value) => {
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
        const instance = new uPlot(
            { ...opts, width: htmlElement.clientWidth, height: htmlElement.clientHeight - 50 },
            timeline,
            htmlElement
        );
        setUPlotInstance(instance);
    }, []);

    useEffect(() => {
        const [timestamp, ...rest] = timeline;
        timestamp.push(now());
        timestamp.shift();
        data.map((item, index) => {
            rest[index].push(item.value);
            rest[index].shift();
        });
        updateTimeline([timestamp, ...rest]);
    }, [data]);

    useEffect(() => {
        updateTimeline(initialState(duration, data.length));
    }, [scope]);

    useEffect(() => {
        uPlotInstance?.setData(timeline);
    }, [timeline]);

    useEffect(() => {
        const [ts, ...rest] = timeline;
        const diff = ts.length - duration;
        if (diff > 0) {
            const draft = timeline.map((value) => value.slice(diff));
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
            setImmediate(() => {
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

export default UplotChart;
