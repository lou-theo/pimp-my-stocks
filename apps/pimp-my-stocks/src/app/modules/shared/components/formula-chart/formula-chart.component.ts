import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Output,
    EventEmitter,
} from '@angular/core';
import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { BaseIndicator, IndicatorTransformResult } from '@sic/core/indicators';
import Chart, {
    ChartConfiguration,
    ChartData,
    ChartTypeRegistry,
} from 'chart.js/auto';
import { DateTime } from 'luxon';
import * as merge from 'deepmerge';
import { MatDialog } from '@angular/material/dialog';
import { AddIndicatorDialogComponent } from '../add-indicators-dialog/add-indicators-dialog.component';
import { ChartPanel } from '@sic/core/models';
import { RemoveIndicatorsDialogComponent } from '../remove-indicators-dialog/remove-indicators-dialog.component';
import {
    EditConfigurationResult,
    EditIndicatorsDialogComponent,
} from '../edit-indicators-dialog/edit-indicators-dialog.component';

@Component({
    selector: 'sic-formula-chart',
    templateUrl: './formula-chart.component.html',
    styleUrls: ['./formula-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaChartComponent implements AfterViewInit {
    @ViewChild('chart') canvas?: ElementRef<HTMLCanvasElement>;

    private _panel: ChartPanel = new ChartPanel(0, []);
    @Input()
    set panel(value: ChartPanel) {
        this._panel = value;
        this.redrawChart();
    }
    get panel(): ChartPanel {
        return this._panel;
    }

    private _chartResult: ChartResultArrayDto | null = null;
    @Input() set chartResult(value: ChartResultArrayDto | null) {
        this._chartResult = value;
        this.redrawChart();
    }
    get chartResult(): ChartResultArrayDto | null {
        return this._chartResult;
    }

    @Input() canDelete = true;

    @Output() addClicked: EventEmitter<void> = new EventEmitter<void>();
    @Output() deleteClicked: EventEmitter<void> = new EventEmitter<void>();

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

        const promises: Promise<IndicatorTransformResult>[] = [];

        for (const indicator of this.panel.indicators) {
            promises.push(indicator.transform(this.chartResult));
        }

        const results: IndicatorTransformResult[] = await Promise.all(promises);
        const datasets = [];

        for (const result of results) {
            for (const dataset of result.datasets) {
                datasets.push(dataset);
            }
        }

        // Draw chart on the canvas
        const data: ChartData<
            keyof ChartTypeRegistry,
            (number | null)[],
            string
        > = {
            labels: this.chartResult.quotes.map((s) =>
                DateTime.fromISO(s.date).setLocale('fr').toLocaleString()
            ),
            datasets: datasets,
        };

        const mergedOption = merge.all(results.map((i) => i.options as object));

        const config: ChartConfiguration<
            keyof ChartTypeRegistry,
            (number | null)[],
            string
        > = {
            type: 'line',
            data: data,
            options: mergedOption,
        };

        this.chart = new Chart(ctx, config);
    }

    openAddDialog(): void {
        const dialogRef = this.dialog.open(AddIndicatorDialogComponent, {
            width: '80%',
        });

        dialogRef
            .afterClosed()
            .subscribe((result: BaseIndicator[] | undefined) => {
                if (result === undefined) {
                    return;
                }

                this.panel.indicators = [...this.panel.indicators, ...result];
                this.redrawChart();
            });
    }

    openRemoveDialog(): void {
        const dialogRef = this.dialog.open(RemoveIndicatorsDialogComponent, {
            width: '80%',
            data: this.panel.indicators,
        });

        dialogRef
            .afterClosed()
            .subscribe((result: BaseIndicator[] | undefined) => {
                if (result === undefined) {
                    return;
                }

                this.panel.indicators = this.panel.indicators.filter(
                    (i) => !result.includes(i)
                );
                this.redrawChart();
            });
    }

    openEditDialog(): void {
        const dialogRef = this.dialog.open(EditIndicatorsDialogComponent, {
            width: '80%',
            height: '80%',
            data: this.panel.indicators,
        });

        dialogRef
            .afterClosed()
            .subscribe((result: EditConfigurationResult[] | undefined) => {
                if (result === undefined) {
                    return;
                }

                for (const configurationResult of result) {
                    const indicator = this.panel.indicators.find(
                        (i) => i === configurationResult.indicator
                    );

                    if (
                        indicator === undefined ||
                        indicator.configurator === null
                    ) {
                        continue;
                    }

                    indicator.configurator.updateConfiguration(
                        configurationResult.configuration
                    );
                }

                this.redrawChart();
            });
    }
}
