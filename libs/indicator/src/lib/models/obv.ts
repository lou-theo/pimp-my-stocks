import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from '../..';
import * as ta from 'ta.web';

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

    public async calculate(
        chartResult: ChartResultArrayDto
    ): Promise<number[]> {
        return await ta.obv(
            chartResult.quotes.map((quote) => [quote.volume, quote.close])
        );
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        return {
            label: this.label,
            dataset: await this.calculate(chartResult),
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
