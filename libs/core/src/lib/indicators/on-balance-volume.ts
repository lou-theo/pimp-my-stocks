import {
    ChartResultArrayDto,
    ChartResultArrayQuoteDto,
} from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';

export class OnBalanceVolumeIndicator extends Indicator {
    public transform(
        chartResult: ChartResultArrayDto
    ): IndicatorTransformResult {
        const results: Map<number, number> = new Map<number, number>();

        return {
            dataset: {
                type: 'line',
                label: 'OBV',
                data: chartResult.quotes.map((current, index, quotes) =>
                    this.calculateObv(quotes, index, results)
                ),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'obv-y-axis',
            },
            options: {
                scales: {
                    'obv-y-axis': {
                        type: 'linear',
                        axis: 'y',
                    },
                },
            },
        };
    }

    private calculateObv(
        quotes: ChartResultArrayQuoteDto[],
        currentIndex: number,
        results: Map<number, number>
    ): number {
        if (currentIndex == 0) {
            return 0;
        }

        const previousIndex: number = currentIndex - 1;
        if (!results.has(previousIndex)) {
            results.set(
                previousIndex,
                this.calculateObv(quotes, previousIndex, results)
            );
        }

        const previousObv: number = results.get(previousIndex) as number;
        const current = quotes[currentIndex];
        const previous = quotes[previousIndex];

        if (current.close > previous.close) {
            return previousObv + current.volume;
        } else if (current.close < previous.close) {
            return previousObv - current.volume;
        } else {
            return previousObv;
        }
    }
}
