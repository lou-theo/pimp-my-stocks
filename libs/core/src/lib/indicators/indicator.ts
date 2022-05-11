import { ChartConfiguration, ChartDataset, ChartTypeRegistry } from 'chart.js';
import { ChartResultArrayDto } from '@sic/api-interfaces/models';

type Configuration = ChartConfiguration<
    keyof ChartTypeRegistry,
    number[],
    string
>;

export type IndicatorTransformResult = {
    dataset: ChartDataset<keyof ChartTypeRegistry, number[]>;
    options: Configuration['options'];
};

export abstract class Indicator {
    public abstract get name(): string;

    public abstract transform(
        chartResult: ChartResultArrayDto
    ): IndicatorTransformResult;
}
