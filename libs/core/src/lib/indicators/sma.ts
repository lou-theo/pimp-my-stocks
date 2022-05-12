import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';
import * as ta from 'ta.web';

export class SimpleMovingAverageIndicator extends Indicator {
    public get name(): string {
        return 'SMA';
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        const result: (number | null)[] = await ta.sma(
            chartResult.quotes.map((quote) => quote.close),
            7
        );

        const missingValues = chartResult.quotes.length - result.length;
        const nulls: null[] = new Array(missingValues).fill(null);
        result.unshift(...nulls);

        return {
            dataset: {
                type: 'line',
                label: 'SMA',
                data: result,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'price-y-axis',
            },
            options: {},
        };
    }
}
