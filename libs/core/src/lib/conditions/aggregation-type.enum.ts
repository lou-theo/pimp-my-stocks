export enum AggregationType {
    MIN = 'Minimum',
    MAX = 'Maximum',
    AVERAGE = 'Moyenne',
    MEDIAN = 'Mediane',
}

export const AggregationTypeLabelMapping: Record<AggregationType, string> = {
    [AggregationType.MIN]: 'Minimum',
    [AggregationType.MAX]: 'Maximum',
    [AggregationType.AVERAGE]: 'Moyenne',
    [AggregationType.MEDIAN]: 'Médiane',
};
