import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import {
    Indicator,
    IndicatorConfiguration,
    IndicatorTransformResult,
} from './indicator';
import * as ta from 'ta.web';
import { notNull } from '../utils';

export type SimpleMovingAverageIndicatorConfiguration =
    IndicatorConfiguration & {
        sourceIndicator: Indicator<number[]>;
        length?: number | undefined;
    };

export class SimpleMovingAverageIndicator extends Indicator<(number | null)[]> {
    public get identifier(): string {
        return 'sma';
    }

    constructor(
        protected override configuration: SimpleMovingAverageIndicatorConfiguration
    ) {
        super(configuration);
    }

    public async calculate(
        chartResult: ChartResultArrayDto
    ): Promise<(number | null)[]> {
        const sourceData: number[] =
            await this.configuration.sourceIndicator.calculate(chartResult);
        const result: (number | null)[] = await ta.sma(
            sourceData,
            this.configuration.length
        );

        const missingValues = chartResult.quotes.length - result.length;
        const nulls: null[] = new Array(missingValues).fill(null);
        result.unshift(...nulls);

        return result;
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        return {
            datasets: [
                {
                    type: 'line',
                    label: 'SMA',
                    data: await this.calculate(chartResult),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: `${this.configuration.sourceIndicator}-y-axis`,
                    pointRadius: 0,
                    pointHitRadius: 4,
                },
            ],
            options: {},
        };
    }
}
