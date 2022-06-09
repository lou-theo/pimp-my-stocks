import { ChartDailyQuoteModel } from '@sic/commons';
import { IndicatorTransformResult } from '../../models/indicator/indicator-transform-result';
import { Indicator } from './indicator';

export class VolumeIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'volume';
    }

    public get label(): string {
        return 'Volume';
    }

    public get yAxisId(): string {
        return `${this.identifier}-y-axis`;
    }

    public configurator = null;

    public calculate(dailyQuotes: ChartDailyQuoteModel[]): Promise<number[]> {
        return Promise.resolve(dailyQuotes.map((s) => s.volume));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async transform(dailyQuotes: ChartDailyQuoteModel[], currency: string): Promise<IndicatorTransformResult> {
        const result = await this.calculate(dailyQuotes);
        const maxVolume = Math.max(...result);

        return {
            identifier: this.identifier,
            label: this.label,
            dataset: await this.calculate(dailyQuotes),
            series: {
                type: 'bar',
                seriesLayoutBy: 'row',
            },
            yAxisId: this.yAxisId,
            yAxis: {
                id: this.yAxisId,
                type: 'value',
                name: this.label,
                min: 0,
                max: maxVolume * 3,
                position: 'left',
                show: false,
            },
        };
    }
}
