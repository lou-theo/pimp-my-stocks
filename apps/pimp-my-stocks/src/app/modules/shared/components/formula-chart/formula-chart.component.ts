import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { Indicator, IndicatorTransformResult } from '@sic/core/indicators';
import Chart, {
    ChartConfiguration,
    ChartData,
    ChartTypeRegistry,
} from 'chart.js/auto';
import { DateTime } from 'luxon';
import * as merge from 'deepmerge';

@Component({
    selector: 'sic-formula-chart',
    templateUrl: './formula-chart.component.html',
    styleUrls: ['./formula-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaChartComponent {
    @ViewChild('chart') canvas?: ElementRef<HTMLCanvasElement>;

    @Input()
    indicators: Indicator[] = [];

    private _chartResult: ChartResultArrayDto | null = null;
    @Input() set chartResult(value: ChartResultArrayDto | null) {
        this._chartResult = value;
        this.redrawChart();
    }

    private chart: Chart | null = null;

    private async redrawChart(): Promise<void> {
        if (this.canvas === undefined) {
            return;
        }

        const ctx: CanvasRenderingContext2D | null =
            this.canvas.nativeElement.getContext('2d');

        if (ctx === null) {
            return;
        }

        // Reset the chart
        if (this.chart != null) {
            this.chart.destroy();
            this.chart = null;
        }

        if (this._chartResult === null) {
            return;
        }

        const results: IndicatorTransformResult[] = [];

        for (const indicator of this.indicators) {
            results.push(indicator.transform(this._chartResult));
        }

        // Draw chart on the canvas
        const data: ChartData<keyof ChartTypeRegistry, number[], string> = {
            labels: this._chartResult.quotes.map((s) =>
                DateTime.fromISO(s.date).setLocale('fr').toLocaleString()
            ),
            datasets: results.map((i) => i.dataset),
        };

        const mergedOption = merge.all(results.map((i) => i.options as object));

        const config: ChartConfiguration<
            keyof ChartTypeRegistry,
            number[],
            string
        > = {
            type: 'line',
            data: data,
            options: mergedOption,
        };

        this.chart = new Chart(ctx, config);
    }
}
