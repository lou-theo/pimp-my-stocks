import { FormBuilder } from '@angular/forms';
import { ChartDailyQuoteModel, unshiftWithNull } from '@sic/commons';
import * as ta from 'ta.web';
import { IndicatorTransformResult } from '../../models/indicator/indicator-transform-result';
import { Indicator } from './indicator';
import { RelativeStrengthIndexIndicatorConfigurator } from './rsi.configuration';

export class RelativeStrengthIndexIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'rsi';
    }

    public get label(): string {
        return `RSI (${this.configurator.configuration.length})`;
    }

    public get yAxisId(): string {
        return `${this.identifier}-y-axis`;
    }

    public configurator: RelativeStrengthIndexIndicatorConfigurator;

    constructor(fb: FormBuilder) {
        super();
        this.configurator = new RelativeStrengthIndexIndicatorConfigurator(fb);
    }

    public async calculate(dailyQuotes: ChartDailyQuoteModel[]): Promise<number[]> {
        const result = await ta.rsi(
            dailyQuotes.map((quote) => quote.close),
            this.configurator.configuration.length
        );

        unshiftWithNull(result, dailyQuotes.length);
        return result;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async transform(dailyQuotes: ChartDailyQuoteModel[], currency: string): Promise<IndicatorTransformResult> {
        return {
            identifier: this.identifier,
            label: this.label,
            dataset: await this.calculate(dailyQuotes),
            series: {
                type: 'line',
                seriesLayoutBy: 'row',
                markLine: {
                    data: [
                        {
                            yAxis: this.configurator.configuration.lowerLimit,
                        },
                        {
                            yAxis: this.configurator.configuration.upperLimit,
                        },
                    ],
                },
            },
            yAxisId: this.yAxisId,
            yAxis: {
                id: this.yAxisId,
                type: 'value',
                name: this.label,
                position: 'right',
            },
        };
    }
}
