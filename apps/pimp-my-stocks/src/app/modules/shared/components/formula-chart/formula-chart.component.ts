import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
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
import { MatDialog } from '@angular/material/dialog';
import { IndicatorDialogComponent } from '../indicator-dialog/indicator-dialog.component';

@Component({
    selector: 'sic-formula-chart',
    templateUrl: './formula-chart.component.html',
    styleUrls: ['./formula-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaChartComponent implements AfterViewInit {
    @ViewChild('chart') canvas?: ElementRef<HTMLCanvasElement>;

    private _indicators: Indicator[] = [];
    @Input()
    set indicators(value: Indicator[]) {
        this._indicators = value;
        this.redrawChart();
    }
    get indicators(): Indicator[] {
        return this._indicators;
    }

    private _chartResult: ChartResultArrayDto | null = null;
    @Input() set chartResult(value: ChartResultArrayDto | null) {
        this._chartResult = value;
        this.redrawChart();
    }
    get chartResult(): ChartResultArrayDto | null {
        return this._chartResult;
    }

    private chart: Chart | null = null;

    constructor(public dialog: MatDialog) {}

    ngAfterViewInit(): void {
        this.redrawChart();
    }

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

        if (this.chartResult === null) {
            return;
        }

        const results: IndicatorTransformResult[] = [];

        for (const indicator of this.indicators) {
            results.push(indicator.transform(this.chartResult));
        }

        // Draw chart on the canvas
        const data: ChartData<keyof ChartTypeRegistry, number[], string> = {
            labels: this.chartResult.quotes.map((s) =>
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

    openDialog(): void {
        const dialogRef = this.dialog.open(IndicatorDialogComponent, {
            width: '250px',
            data: this.indicators,
        });

        dialogRef.afterClosed().subscribe((result: Indicator | undefined) => {
            if (result === undefined) {
                return;
            }

            this.indicators = [...this.indicators, result];
        });
    }
}
