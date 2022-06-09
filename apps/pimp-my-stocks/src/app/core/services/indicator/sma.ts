import { FormBuilder } from '@angular/forms';
import { ChartDailyQuoteModel, unshiftWithNull } from '@sic/commons';
import * as ta from 'ta.web';
import { IndicatorTransformResult } from '../../models/indicator/indicator-transform-result';
import { Indicator } from './indicator';
import { SimpleMovingAverageIndicatorConfigurator } from './sma.configuration';

export class SimpleMovingAverageIndicator extends Indicator<(number | null)[]> {
    public get identifier(): string {
        return 'sma';
    }

    public get label(): string {
        return 'SMA (14)';
    }

    public get yAxisId(): string {
        return `${this.configurator.configuration.sourceIndicator.identifier}-y-axis`;
    }

    public configurator: SimpleMovingAverageIndicatorConfigurator;

    constructor(fb: FormBuilder) {
        super();
        this.configurator = new SimpleMovingAverageIndicatorConfigurator(fb);
    }

    public async calculate(dailyQuotes: ChartDailyQuoteModel[]): Promise<(number | null)[]> {
        const sourceData: number[] = await this.configurator.configuration.sourceIndicator.calculate(dailyQuotes);

        const result: (number | null)[] = await ta.sma(sourceData, this.configurator.configuration.length);

        unshiftWithNull(result, dailyQuotes.length);
        return result;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async transform(dailyQuotes: ChartDailyQuoteModel[], currency: string): Promise<IndicatorTransformResult> {
        return {
            identifier: this.identifier,
            label: this.label,
            dataset: await this.calculate(dailyQuotes),
            yAxisId: this.yAxisId,
            series: { type: 'line', seriesLayoutBy: 'row' },
        };
    }
}
