import { ChartResultArrayDto, ChartResultArrayQuoteDto } from '../api/models';
import { Indicator, IndicatorTransformResult } from './indicator';

export class OnBalanceVolumeIndicator extends Indicator {
    public transform(
        chartResult: ChartResultArrayDto
    ): IndicatorTransformResult {
        return {
            dataset: {
                type: 'line',
                label: 'OBV',
                data: chartResult.quotes.map((current, index, quotes) =>
                    this.calculateObv(quotes, index)
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
        currentIndex: number
    ): number {
        if (currentIndex == 0) {
            return 0;
        }

        const previousObv = this.calculateObv(quotes, currentIndex - 1);
        const current = quotes[currentIndex];
        const previous = quotes[currentIndex - 1];

        if (current.close > previous.close) {
            return previousObv + current.volume;
        } else if (current.close < previous.close) {
            return previousObv - current.volume;
        } else {
            return previousObv;
        }
    }
}
