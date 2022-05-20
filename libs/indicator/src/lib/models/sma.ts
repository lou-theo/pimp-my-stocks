import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator } from './indicator';
import * as ta from 'ta.web';
import { SimpleMovingAverageIndicatorConfigurator } from './sma.configuration';
import { FormBuilder } from '@angular/forms';
import { unshiftWithNull } from '@sic/core';
import { IndicatorTransformResult } from '../types/indicator-transform-result';

export class SimpleMovingAverageIndicator extends Indicator<(number | null)[]> {
    public get identifier(): string {
        return 'sma';
    }

    public get label(): string {
        return 'SMA (14)';
    }

    public get yAxisId(): string {
        return `${this.configurator.configuration.sourceIndicator.identifier}-y-axis`;
    }

    public configurator: SimpleMovingAverageIndicatorConfigurator;

    constructor(fb: FormBuilder) {
        super();
        this.configurator = new SimpleMovingAverageIndicatorConfigurator(fb);
    }

    public async calculate(
        chartResult: ChartResultArrayDto
    ): Promise<(number | null)[]> {
        const sourceData: number[] =
            await this.configurator.configuration.sourceIndicator.calculate(
                chartResult
            );

        const result: (number | null)[] = await ta.sma(
            sourceData,
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
            yAxisId: this.yAxisId,
            series: { type: 'line', seriesLayoutBy: 'row' },
        };
    }
}
