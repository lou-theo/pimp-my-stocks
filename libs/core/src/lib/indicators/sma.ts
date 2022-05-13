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
        sourceIndicator: Indicator;
        length?: number | undefined;
    };

export class SimpleMovingAverageIndicator extends Indicator {
    public get identifier(): string {
        return 'sma';
    }

    constructor(
        protected override configuration: SimpleMovingAverageIndicatorConfiguration
    ) {
        super(configuration);
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        const sourceData: number[] = (
            await this.configuration.sourceIndicator.transform(chartResult)
        ).dataset.data.filter(notNull);
        const result: (number | null)[] = await ta.sma(
            sourceData,
            this.configuration.length
        );

        const missingValues = chartResult.quotes.length - result.length;
        const nulls: null[] = new Array(missingValues).fill(null);
        result.unshift(...nulls);

        return {
            dataset: {
                type: 'line',
                label: 'SMA',
                data: result,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: `${this.configuration.sourceIndicator}-y-axis`,
            },
            options: {},
        };
    }
}
