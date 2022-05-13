import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';

export class PriceIndicator extends Indicator {
    public get identifier(): string {
        return 'price';
    }

    constructor() {
        super({});
    }

    public transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        const yAxis = `${this.identifier}-y-axis`;

        return Promise.resolve({
            dataset: {
                type: 'line',
                label: `Price (${chartResult.meta.currency})`,
                data: chartResult.quotes.map((s) => s.close),
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                yAxisID: yAxis,
                pointRadius: 0,
                pointHitRadius: 4,
            },
            options: {
                scales: {
                    [yAxis]: {
                        type: 'linear',
                        axis: 'y',
                        position: 'right',
                    },
                },
            },
        });
    }
}
