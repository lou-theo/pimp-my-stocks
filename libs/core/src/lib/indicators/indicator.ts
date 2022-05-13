import { ChartConfiguration, ChartDataset, ChartTypeRegistry } from 'chart.js';
import { ChartResultArrayDto } from '@sic/api-interfaces/models';

type Configuration = ChartConfiguration<
    keyof ChartTypeRegistry,
    number[],
    string
>;

type Dataset = ChartDataset<keyof ChartTypeRegistry, (number | null)[]>;

export type IndicatorTransformResult = {
    datasets: Dataset[];
    options: Configuration['options'];
};

export type IndicatorConfiguration = {
    [key: string]: unknown;
};

export abstract class BaseIndicator {
    /**
     * Get the unique identifier for this indicator.
     */
    public abstract get identifier(): string;

    constructor(protected configuration: IndicatorConfiguration) {}

    /**
     * Transform the data to get a result that can be displayed in a chart.
     * @param chartResult The source data.
     */
    public abstract transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult>;
}

export abstract class Indicator<T> extends BaseIndicator {
    /**
     * Calculate the result for this indicator.
     * @param chartResult The source data.
     */
    public abstract calculate(chartResult: ChartResultArrayDto): Promise<T>;
}
