export const CHART_INTERVALS = [
    '1m',
    '2m',
    '5m',
    '15m',
    '30m',
    '60m',
    '90m',
    '1h',
    '1d',
    '5d',
    '1wk',
    '1mo',
    '3mo',
] as const;
export type ChartInterval = typeof CHART_INTERVALS[number];

export function isChartInterval(interval: string): interval is ChartInterval {
    return CHART_INTERVALS.includes(interval as ChartInterval);
}
