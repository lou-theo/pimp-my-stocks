import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from '../..';

export class VolumeIndicator extends Indicator<number[]> {
    public get identifier(): string {
        return 'volume';
    }

    public get label(): string {
        return 'Volume';
    }

    public get yAxisId(): string {
        return `${this.identifier}-y-axis`;
    }

    public configurator = null;

    public calculate(chartResult: ChartResultArrayDto): Promise<number[]> {
        return Promise.resolve(chartResult.quotes.map((s) => s.volume));
    }

    public async transform(
        chartResult: ChartResultArrayDto
    ): Promise<IndicatorTransformResult> {
        const result = await this.calculate(chartResult);
        const maxVolume = Math.max(...result);

        return {
            label: this.label,
            dataset: await this.calculate(chartResult),
            series: {
                type: 'bar',
                seriesLayoutBy: 'row',
            },
            yAxisId: this.yAxisId,
            yAxis: {
                id: this.yAxisId,
                type: 'value',
                name: this.label,
                min: 0,
                max: maxVolume * 3,
                position: 'left',
                show: false,
            },
        };
    }
}
