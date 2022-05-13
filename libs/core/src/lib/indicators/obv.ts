import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';
import * as ta from 'ta.web';

export class OnBalanceVolumeIndicator extends Indicator {
    public get identifier(): string {
        return 'obv';
    }

    constructor() {
        super({});
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        const yAxis = `${this.identifier}-y-axis`;

        return {
            dataset: {
                type: 'line',
                label: 'OBV',
                data: await ta.obv(
                    chartResult.quotes.map((quote) => [
                        quote.volume,
                        quote.close,
                    ])
                ),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: yAxis,
            },
            options: {
                scales: {
                    [yAxis]: {
                        type: 'linear',
                        axis: 'y',
                        display: false,
                    },
                },
            },
        };
    }
}
