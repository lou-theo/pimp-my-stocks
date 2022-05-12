import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';
import * as ta from 'ta.web';

export class RelativeStrengthIndexIndicator extends Indicator {
    public get name(): string {
        return 'RSI';
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        return {
            dataset: {
                type: 'line',
                label: 'RSI',
                data: await ta.rsi(
                    chartResult.quotes.map((quote) => quote.close)
                ),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'RSI-y-axis',
            },
            options: {
                scales: {
                    'RSI-y-axis': {
                        type: 'linear',
                        axis: 'y',
                        display: true,
                    },
                },
            },
        };
    }
}
