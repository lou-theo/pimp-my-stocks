import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';

export class PriceIndicator extends Indicator {
    public get name(): string {
        return 'Price';
    }

    public transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        return Promise.resolve({
            dataset: {
                type: 'line',
                label: `Price (${chartResult.meta.currency})`,
                data: chartResult.quotes.map((s) => s.close),
                fill: false,
                borderColor: 'rgb(54, 162, 235)',
                yAxisID: 'price-y-axis',
                pointRadius: 0,
            },
            options: {
                scales: {
                    'price-y-axis': {
                        type: 'linear',
                        axis: 'y',
                        position: 'right',
                    },
                },
            },
        });
    }
}
