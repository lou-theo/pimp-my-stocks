import { FormBuilder } from '@angular/forms';
import { ChartDailyQuoteModel } from '@sic/commons';
import { IndicatorTransformResult } from '../../models/indicator/indicator-transform-result';
import { Indicator } from './indicator';
import { PriceDisplayType, PriceIndicatorConfigurator } from './price.configuration';

export class PriceIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'price';
    }

    public get label(): string {
        return 'Price';
    }

    public get yAxisId(): string {
        return `${this.identifier}-y-axis`;
    }

    public configurator: PriceIndicatorConfigurator;

    constructor(fb: FormBuilder) {
        super();
        this.configurator = new PriceIndicatorConfigurator(fb);
    }

    public calculate(dailyQuotes: ChartDailyQuoteModel[]): Promise<number[]> {
        let result: number[] = [];

        switch (this.configurator.configuration.display) {
            case PriceDisplayType.OPEN:
                result = dailyQuotes.map((s) => s.open);
                break;
            case PriceDisplayType.CLOSE:
                result = dailyQuotes.map((s) => s.close);
                break;
        }

        return Promise.resolve(result);
    }

    public async transform(dailyQuotes: ChartDailyQuoteModel[], currency: string): Promise<IndicatorTransformResult> {
        return {
            identifier: this.identifier,
            label: `${this.label} (${currency})`,
            dataset: await this.calculate(dailyQuotes),
            yAxisId: this.yAxisId,
            yAxis: {
                id: this.yAxisId,
                type: 'value',
                name: 'Price',
                position: 'right',
                axisLabel: {
                    formatter: `{value} ${currency}`,
                },
            },
            series: {
                type: 'line',
                seriesLayoutBy: 'row',
            },
        };
    }
}
