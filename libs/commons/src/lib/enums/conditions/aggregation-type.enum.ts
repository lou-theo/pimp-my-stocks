export enum AggregationType {
    MIN = 1,
    MAX = 2,
    AVERAGE = 3,
    MEDIAN = 4,
}

export const AggregationTypeLabelMapping: Record<AggregationType, string> = {
    [AggregationType.MIN]: 'Minimum',
    [AggregationType.MAX]: 'Maximum',
    [AggregationType.AVERAGE]: 'Moyenne',
    [AggregationType.MEDIAN]: 'Médiane',
};
