import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';
import * as ta from 'ta.web';

export class OnBalanceVolumeIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'obv';
    }

    public get label(): string {
        return 'OBV';
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
        const yAxis = `${this.identifier}-y-axis`;

        return {
            datasets: [
                {
                    type: 'line',
                    label: this.label,
                    data: await this.calculate(chartResult),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
                        display: false,
                    },
                },
            },
        };
    }
}
