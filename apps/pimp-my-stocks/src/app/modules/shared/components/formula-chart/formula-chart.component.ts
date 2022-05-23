import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Output,
    EventEmitter,
    HostListener,
    OnDestroy,
} from '@angular/core';
import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import {
    BaseIndicator,
    IndicatorTransformResult,
    RelativeStrengthIndexIndicator,
} from '@sic/indicator';
import { MatDialog } from '@angular/material/dialog';
import { AddIndicatorDialogComponent } from '../add-indicators-dialog/add-indicators-dialog.component';
import { RemoveIndicatorsDialogComponent } from '../remove-indicators-dialog/remove-indicators-dialog.component';
import {
    EditConfigurationResult,
    EditIndicatorsDialogComponent,
} from '../edit-indicators-dialog/edit-indicators-dialog.component';
import { Condition, EqualityType } from '@sic/condition';
import { FormBuilder } from '@angular/forms';
import * as echarts from 'echarts';
import { ChartPanel } from '../../models/chart-panel';
import { DateTime } from 'luxon';

@Component({
    selector: 'sic-formula-chart',
    templateUrl: './formula-chart.component.html',
    styleUrls: ['./formula-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormulaChartComponent implements AfterViewInit, OnDestroy {
    @ViewChild('chart') chartContainer?: ElementRef<HTMLDivElement>;

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
    @Output() mouseHover: EventEmitter<MouseEvent> =
        new EventEmitter<MouseEvent>();
    @Output() mouseLeave: EventEmitter<void> = new EventEmitter<void>();
    @Output() zoomChange: EventEmitter<echarts.SliderDataZoomEvent> =
        new EventEmitter<echarts.SliderDataZoomEvent>();

    private chart: echarts.ECharts | null = null;

    constructor(public dialog: MatDialog, public readonly fb: FormBuilder) {}

    ngAfterViewInit(): void {
        this.redrawChart();
    }

    private async redrawChart(): Promise<void> {
        if (this.chartContainer === undefined) {
            return;
        }

        // Reset the chart
        if (this.chart != null) {
            this.chart.dispose();
            this.chart = null;
        }

        if (this.chartResult === null) {
            return;
        }

        if (this.panel.indicators.length === 0) {
            return;
        }

        // Get indicators datasets
        const promises: Promise<IndicatorTransformResult>[] = [];

        for (const indicator of this.panel.indicators) {
            promises.push(indicator.transform(this.chartResult));
        }

        const results: IndicatorTransformResult[] = await Promise.all(promises);

        // Add all y axis
        const yAxis: echarts.EChartOption.YAxis[] = [];
        for (const result of results) {
            if (result.yAxis !== undefined) {
                // Add this axis if not already added
                if (
                    yAxis.find((axis) => axis.id === result.yAxis?.id) ===
                    undefined
                ) {
                    yAxis.push(result.yAxis);
                }
            }
        }

        // Add all datasets

        const datasetSources: (number | string | null)[][] = [
            ['Date', ...this.chartResult.quotes.map((s) => s.date)],
        ];
        const series: echarts.EChartOption.Series[] = [];

        for (const result of results) {
            const useAxis = yAxis.find((axis) => axis.id === result.yAxisId);

            if (useAxis === undefined) {
                console.error(`No axis found for id '${result.yAxisId}'`);
                return;
            }

            const axisIndex = yAxis.indexOf(useAxis);

            if (axisIndex === undefined) {
                console.error(`No axis found for id '${result.yAxisId}'`);
                return;
            }

            if (result.identifier === 'price') {
                // TODO: Remove condition placeholder data & calculations

                // Show condition result on the price chart
                const condition = new Condition(
                    new RelativeStrengthIndexIndicator(this.fb),
                    80,
                    EqualityType.SUPERIOR
                );

                const conditionResult: Set<number> = await condition.evaluate(
                    this.chartResult
                );

                const points: any[] = [];

                // TODO: Get coord from the condition result
                conditionResult.forEach((index) => {
                    points.push({
                        name: 'test',
                        symbol: 'arrow',
                        symbolSize: 10,
                        coord: [index, this.chartResult?.quotes[index].close],
                        itemStyle: {
                            color: 'green',
                        },
                    });
                });

                result.series.markPoint = {
                    label: {
                        formatter: (params: { name: string }) => {
                            return '';
                        },
                    },
                    data: points,
                };
            }

            datasetSources.push([result.label, ...result.dataset]);
            result.series.yAxisIndex = axisIndex;
            series.push(result.series);
        }

        // Initialize the echarts instance
        const myChart: echarts.ECharts = echarts.init(
            this.chartContainer.nativeElement
        );

        myChart.getZr().on('mousemove', (params: { event: MouseEvent }) => {
            this.mouseHover.emit(params.event);
        });

        myChart.on('globalout', () => {
            this.mouseLeave.emit();
        });

        myChart.on(
            'datazoom',
            (
                params:
                    | echarts.SliderDataZoomEvent
                    | echarts.InsideDataZoomEvent
            ) => {
                const sliderEvent: echarts.SliderDataZoomEvent =
                    params.batch !== undefined
                        ? params.batch[0]
                        : (params as echarts.SliderDataZoomEvent);
                this.zoomChange.emit(sliderEvent);
            }
        );

        // Draw the chart
        myChart.setOption({
            legend: {},
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none',
                    },
                    restore: {},
                    saveAsImage: {},
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'cross' },
            },
            dataset: {
                source: datasetSources,
            },
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        formatter: function (value: string) {
                            return DateTime.fromISO(value)
                                .setLocale('fr-FR')
                                .toLocaleString();
                        },
                    },
                },
            ],
            yAxis: yAxis,
            series: series,
            dataZoom: [
                {
                    type: 'inside',
                },
                {
                    type: 'slider',
                },
            ],
        });

        this.chart = myChart;
    }

    @HostListener('window:resize')
    private onResize() {
        this.chart?.resize();
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

    public showTooltip(event: MouseEvent) {
        this.chart?.dispatchAction({
            type: 'showTip',
            x: event.offsetX,
            y: event.offsetY,
        });
    }

    public hideTooltip() {
        this.chart?.dispatchAction({
            type: 'hideTip',
        });
    }

    public zoom(zoom: echarts.SliderDataZoomEvent) {
        const currentZoom: echarts.EChartOption.DataZoom | undefined =
            this.chart?.getOption().dataZoom?.[0];

        if (
            currentZoom === undefined ||
            (currentZoom.start === zoom.start && currentZoom.end === zoom.end)
        ) {
            return;
        }

        this.chart?.dispatchAction({
            type: 'dataZoom',
            start: zoom.start,
            end: zoom.end,
        });
    }

    ngOnDestroy(): void {
        this.chart?.dispose();
    }
}
