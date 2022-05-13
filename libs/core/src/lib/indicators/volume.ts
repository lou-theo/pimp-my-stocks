import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';

export class VolumeIndicator extends Indicator {
    public get identifier(): string {
        return 'volume';
    }

    constructor() {
        super({});
    }

    public transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        const maxVolume = Math.max(...chartResult.quotes.map((s) => s.volume));
        const yAxis = `${this.identifier}-y-axis`;

        return Promise.resolve({
            dataset: {
                type: 'bar',
                label: 'Volume',
                data: chartResult.quotes.map((s) => s.volume),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: yAxis,
            },
            options: {
                scales: {
                    [yAxis]: {
                        type: 'linear',
                        axis: 'y',
                        display: false,
                        max: maxVolume * 3,
                    },
                },
            },
        });
    }
}
