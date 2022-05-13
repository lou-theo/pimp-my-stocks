import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';

export class PriceIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'price';
    }

    public get label(): string {
        return 'Price';
    }

    constructor() {
        super({});
    }

    public calculate(chartResult: ChartResultArrayDto): Promise<number[]> {
        return Promise.resolve(chartResult.quotes.map((s) => s.close));
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        const yAxis = `${this.identifier}-y-axis`;

        return {
            datasets: [
                {
                    type: 'line',
                    label: `${this.label} (${chartResult.meta.currency})`,
                    data: await this.calculate(chartResult),
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)',
                    yAxisID: yAxis,
                    pointRadius: 0,
                    pointHitRadius: 4,
                },
            ],
            options: {
                scales: {
                    [yAxis]: {
                        type: 'linear',
                        axis: 'y',
                        position: 'right',
                    },
                },
            },
        };
    }
}
