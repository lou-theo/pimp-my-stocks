import { ChartDailyQuoteModel } from '@sic/commons';
import { IndicatorTransformResult } from '../../models/indicator/indicator-transform-result';
import { BaseIndicatorConfigurator } from './indicator.configuration';

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
     * @param dailyQuotes The quotes array
     * @param currency The currency symbol to display
     */
    public abstract transform(dailyQuotes: ChartDailyQuoteModel[], currency: string): Promise<IndicatorTransformResult>;
}

export abstract class Indicator<TCalculateResult> extends BaseIndicator {
    /**
     * Calculate the result for this indicator.
     * @param dailyQuotes The quotes array
     */
    public abstract calculate(dailyQuotes: ChartDailyQuoteModel[]): Promise<TCalculateResult>;
}
