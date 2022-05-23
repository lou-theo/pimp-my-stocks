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

    public get yAxisId(): string {
        return `${this.identifier}-y-axis`;
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
        return {
            identifier: this.identifier,
            label: `${this.label} (${chartResult.meta.currency})`,
            dataset: await this.calculate(chartResult),
            yAxisId: this.yAxisId,
            yAxis: {
                id: this.yAxisId,
                type: 'value',
                name: 'Price',
                position: 'right',
                axisLabel: {
                    formatter: `{value} ${chartResult.meta.currency}`,
                },
            },
            series: {
                type: 'line',
                seriesLayoutBy: 'row',
            },
        };
    }
}
