import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import * as ta from 'ta.web';
import { RelativeStrengthIndexIndicatorConfigurator } from './rsi.configuration';
import { FormBuilder } from '@angular/forms';
import { Indicator } from './indicator';
import { unshiftWithNull } from '@sic/core';
import { IndicatorTransformResult } from '../types/indicator-transform-result';

export class RelativeStrengthIndexIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'rsi';
    }

    public get label(): string {
        return `RSI (${this.configurator.configuration.length})`;
    }

    public get yAxisId(): string {
        return `${this.identifier}-y-axis`;
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
        return {
            label: this.label,
            dataset: await this.calculate(chartResult),
            series: {
                type: 'line',
                seriesLayoutBy: 'row',
                markLine: {
                    data: [
                        {
                            yAxis: this.configurator.configuration.lowerLimit,
                        },
                        {
                            yAxis: this.configurator.configuration.upperLimit,
                        },
                    ],
                },
            },
            yAxisId: this.yAxisId,
            yAxis: {
                id: this.yAxisId,
                type: 'value',
                name: this.label,
                position: 'right',
            },
        };
    }
}
