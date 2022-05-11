import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';

export class VolumeIndicator extends Indicator {
    public get name(): string {
        return 'Volume';
    }

    public transform(
        chartResult: ChartResultArrayDto
    ): IndicatorTransformResult {
        const maxVolume = Math.max(...chartResult.quotes.map((s) => s.volume));

        return {
            dataset: {
                type: 'bar',
                label: 'Volume',
                data: chartResult.quotes.map((s) => s.volume),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'volume-y-axis',
            },
            options: {
                scales: {
                    'volume-y-axis': {
                        type: 'linear',
                        axis: 'y',
                        display: false,
                        max: maxVolume * 3,
                    },
                },
            },
        };
    }
}
