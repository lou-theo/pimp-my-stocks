import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';
import * as ta from 'ta.web';
import { RelativeStrengthIndexIndicatorConfigurator } from './rsi.configuration';
import { FormBuilder } from '@angular/forms';
import { unshiftWithNull } from '../utils';

export class RelativeStrengthIndexIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'rsi';
    }

    public get label(): string {
        return `RSI (${this.configurator.configuration.length})`;
    }

    public configurator: RelativeStrengthIndexIndicatorConfigurator;

    constructor(fb: FormBuilder) {
        super();
        this.configurator = new RelativeStrengthIndexIndicatorConfigurator(fb);
    }

    public async calculate(
        chartResult: ChartResultArrayDto
    ): Promise<number[]> {
        const result = await ta.rsi(
            chartResult.quotes.map((quote) => quote.close),
            this.configurator.configuration.length
        );

        unshiftWithNull(result, chartResult.quotes.length);
        return result;
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        const yAxis = `${this.identifier}-y-axis`;
        const result = await this.calculate(chartResult);

        return {
            datasets: [
                {
                    type: 'line',
                    label: this.label,
                    data: result,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: yAxis,
                    pointRadius: 0,
                    pointHitRadius: 4,
                },
                {
                    type: 'line',
                    label: 'none',
                    data: result.map(
                        (x) => this.configurator.configuration.lowerLimit
                    ),
                    borderColor: 'grey',
                    borderDash: [5, 15],
                    yAxisID: yAxis,
                    pointRadius: 0,
                    pointHitRadius: 0,
                },
                {
                    type: 'line',
                    label: 'none',
                    data: result.map(
                        (x) => this.configurator.configuration.upperLimit
                    ),
                    borderColor: 'grey',
                    borderDash: [5, 15],
                    yAxisID: yAxis,
                    pointRadius: 0,
                    pointHitRadius: 0,
                },
            ],
            options: {
                scales: {
                    [yAxis]: {
                        type: 'linear',
                        axis: 'y',
                        display: true,
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            filter: (item) => {
                                return item.text != 'none';
                            },
                        },
                    },
                },
            },
        };
    }
}
