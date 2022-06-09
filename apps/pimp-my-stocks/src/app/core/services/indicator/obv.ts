import { ChartDailyQuoteModel } from '@sic/commons';
import { obv } from 'ta.web';
import { IndicatorTransformResult } from '../../models/indicator/indicator-transform-result';
import { Indicator } from './indicator';

export class OnBalanceVolumeIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'obv';
    }

    public get label(): string {
        return 'OBV';
    }

    public get yAxisId(): string {
        return `${this.identifier}-y-axis`;
    }

    public configurator = null;

    public async calculate(dailyQuotes: ChartDailyQuoteModel[]): Promise<number[]> {
        return await obv(dailyQuotes.map((quote) => [quote.volume, quote.close]));
    }

    public async transform(dailyQuotes: ChartDailyQuoteModel[]): Promise<IndicatorTransformResult> {
        return {
            identifier: this.identifier,
            label: this.label,
            dataset: await this.calculate(dailyQuotes),
            yAxisId: this.yAxisId,
            yAxis: {
                id: this.yAxisId,
                type: 'value',
                name: this.label,
                position: 'right',
            },
            series: { type: 'line', seriesLayoutBy: 'row' },
        };
    }
}
