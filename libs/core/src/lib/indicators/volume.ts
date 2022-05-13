import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from './indicator';

export class VolumeIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'volume';
    }

    public get label(): string {
        return 'Volume';
    }

    constructor() {
        super({});
    }

    public calculate(chartResult: ChartResultArrayDto): Promise<number[]> {
        return Promise.resolve(chartResult.quotes.map((s) => s.volume));
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        const result = await this.calculate(chartResult);
        const maxVolume = Math.max(...result);
        const yAxis = `${this.identifier}-y-axis`;

        return {
            datasets: [
                {
                    type: 'bar',
                    label: this.label,
                    data: result,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: yAxis,
                },
            ],
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
        };
    }
}
