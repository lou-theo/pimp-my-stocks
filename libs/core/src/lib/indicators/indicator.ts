import { ChartConfiguration, ChartDataset, ChartTypeRegistry } from 'chart.js';
import { ChartResultArrayDto } from '@sic/api-interfaces/models';

type Configuration = ChartConfiguration<
    keyof ChartTypeRegistry,
    number[],
    string
>;

export type IndicatorTransformResult = {
    dataset: ChartDataset<keyof ChartTypeRegistry, (number | null)[]>;
    options: Configuration['options'];
};

export type IndicatorConfiguration = {
    [key: string]: unknown;
};

export abstract class Indicator {
    public abstract get identifier(): string;

    constructor(protected configuration: IndicatorConfiguration) {}

    public abstract transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult>;
}
