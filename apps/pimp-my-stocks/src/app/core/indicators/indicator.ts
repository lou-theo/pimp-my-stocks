import { ChartConfiguration, ChartDataset, ChartTypeRegistry } from 'chart.js';
import { ChartResultArrayDto } from '../api/models';

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
    public abstract transform(
        chartResult: ChartResultArrayDto
    ): IndicatorTransformResult;
}
