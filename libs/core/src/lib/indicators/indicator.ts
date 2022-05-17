import { ChartConfiguration, ChartDataset, ChartTypeRegistry } from 'chart.js';
import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { BaseIndicatorConfigurator } from './indicator.configuration';

export type Configuration = ChartConfiguration<
    keyof ChartTypeRegistry,
    number[],
    string
>;

export type Dataset = ChartDataset<keyof ChartTypeRegistry, (number | null)[]>;

export type IndicatorTransformResult = {
    datasets: Dataset[];
    options: Configuration['options'];
};

export abstract class BaseIndicator {
    /**
     * Get the unique identifier for this indicator.
     */
    public abstract get identifier(): string;

    /**
     * Get the label shown in the chart.
     */
    public abstract get label(): string;

    public abstract configurator: BaseIndicatorConfigurator | null;

    /**
     * Transform the data to get a result that can be displayed in a chart.
     * @param chartResult The source data.
     */
    public abstract transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult>;
}

export abstract class Indicator<TCalculateResult> extends BaseIndicator {
    /**
     * Calculate the result for this indicator.
     * @param chartResult The source data.
     */
    public abstract calculate(
        chartResult: ChartResultArrayDto
    ): Promise<TCalculateResult>;
}
