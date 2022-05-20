import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { BaseIndicatorConfigurator, IndicatorTransformResult } from '../..';

export abstract class BaseIndicator {
    /**
     * Get the unique identifier for this indicator.
     */
    public abstract get identifier(): string;

    /**
     * Get the label shown in the chart.
     */
    public abstract get label(): string;

    /**
     * Get the id of the y axis used by this indicator.
     */
    public abstract get yAxisId(): string;

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
