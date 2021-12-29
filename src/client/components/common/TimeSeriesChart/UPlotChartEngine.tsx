import React, { createRef, useEffect, useMemo, useState } from 'react';
import UPlot, { AlignedData } from 'uplot';
import 'uplot/dist/uPlot.min.css';

const throttle = (func: Function, duration: number) => {
    let wait = false;
    return function (...args: unknown[]) {
        if (!wait) {
            func.apply(null, args);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, duration);
        }
    };
};

const debounce = (func: (...ars: unknown[]) => unknown, duration: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: unknown[]) {
        const effect = () => {
            clearTimeout(timeout);
            return func.apply(null, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(effect, duration);
    };
};

export interface IUPlotChartProps {
    series: AlignedData;
    lines: IUPlotChartPropsLine[];
}

export interface IUPlotChartPropsLine {
    label: string;
    scale: string;
    color: string;
    fill: string;
}

const UPlotChartEngine: React.FC<IUPlotChartProps> = ({ series, lines }) => {
    const [uPlotInstance, setUPlotInstance] = useState<UPlot | null>(null);
    const plotRef = useMemo(() => createRef<HTMLDivElement>(), []);

    useEffect(() => {
        if (uPlotInstance) {
            uPlotInstance.destroy();
            setUPlotInstance(null);
        }
        if (plotRef.current) {
            const htmlElement = plotRef.current;
            const opts: UPlot.Options = {
                width: 700,
                height: 300,
                series: [
                    {
                        points: {
                            show: false
                        }
                    },
                    ...lines.map((i) => ({
                        label: i.label,
                        stroke: i.color,
                        scale: i.scale,
                        points: {
                            show: false
                        },
                        spanGaps: false,
                        fill: i.fill
                    }))
                ],
                axes: [
                    {},
                    ...lines.map((value, index) => {
                        const side = index > 0 ? 1 : 3;
                        return {
                            scale: value.scale,
                            side,
                            grid: { show: true }
                        };
                    })
                ]
            };

            const instance = new UPlot(
                { ...opts, width: htmlElement.clientWidth, height: htmlElement.clientHeight - 50 },
                series,
                htmlElement
            );
            setUPlotInstance(instance);
        }
        return () => {
            uPlotInstance?.destroy();
            setUPlotInstance(null);
        };
    }, [lines, series]);

    useEffect(() => {
        debounce(() => {
            if (uPlotInstance && plotRef.current && plotRef.current.parentElement) {
                uPlotInstance.setSize({ width: 0, height: 0 });
                const holder = plotRef.current.parentElement;
                const { clientWidth, clientHeight } = holder;
                uPlotInstance.setSize({ width: clientWidth, height: clientHeight - 50 });
            }
        }, 500);
    }, [window.innerWidth, window.innerHeight]);

    return (
        <div
            style={{
                width: '100%',
                height: '20rem',
                position: 'relative'
            }}
        >
            <div style={{ width: '100%', overflow: 'hidden', height: '100%', position: 'relative' }} ref={plotRef} />
        </div>
    );
};

export default UPlotChartEngine;
