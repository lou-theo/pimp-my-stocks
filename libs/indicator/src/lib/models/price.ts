import { FormBuilder } from '@angular/forms';
import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { IndicatorTransformResult } from '../types/indicator-transform-result';
import { Indicator } from './indicator';
import {
    PriceDisplayType,
    PriceIndicatorConfigurator,
} from './price.configuration';

export class PriceIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'price';
    }

    public get label(): string {
        return 'Price';
    }

    public configurator: PriceIndicatorConfigurator;

    constructor(fb: FormBuilder) {
        super();
        this.configurator = new PriceIndicatorConfigurator(fb);
    }

    public calculate(chartResult: ChartResultArrayDto): Promise<number[]> {
        let result: number[] = [];

        switch (this.configurator.configuration.display) {
            case PriceDisplayType.OPEN:
                result = chartResult.quotes.map((s) => s.open);
                break;
            case PriceDisplayType.CLOSE:
                result = chartResult.quotes.map((s) => s.close);
                break;
        }

        return Promise.resolve(result);
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
                    pointHitRadius: 1,
                    order: 10,
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
