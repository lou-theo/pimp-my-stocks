import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    AfterViewInit,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { ApiService } from '../../../../core/api/services';
import Chart, {
    ChartConfiguration,
    ChartData,
    ChartTypeRegistry,
} from 'chart.js/auto';
import { DateTime } from 'luxon';
import {
    BehaviorSubject,
    firstValueFrom,
    Observable,
    Subscription,
} from 'rxjs';
import { ChartResultArrayDto } from '../../../../core/api/models/chart-result-array-dto';
import { ChartInterval, CHART_INTERVALS } from '@sic/api-interfaces';
import { FormControl } from '@angular/forms';
import { isBeforeDateValidator } from '../../../../core/validators/before-date';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'sic-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('chart') canvas?: ElementRef<HTMLCanvasElement>;

    private _symbol: string | null = null;
    @Input() set symbol(value: string | null) {
        this._symbol = value;
        this.redrawChart();
    }

    private chart: Chart | null = null;
    private hasChart: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    public hasChart$: Observable<boolean> = this.hasChart.asObservable();

    public intervalControl: FormControl = new FormControl(
        '1mo' as ChartInterval
    );
    public startDateControl: FormControl = new FormControl(
        DateTime.now().minus({ years: 1 }),
        isBeforeDateValidator(DateTime.now())
    );

    public chartError: string | null = null;

    CHART_INTERVALS = CHART_INTERVALS;

    private subscriptions: Subscription = new Subscription();

    constructor(private readonly apiService: ApiService) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.startDateControl.valueChanges.subscribe(() => {
                if (this.startDateControl.valid) {
                    this.redrawChart();
                }
            })
        );

        this.subscriptions.add(
            this.intervalControl.valueChanges.subscribe(() => {
                this.redrawChart();
            })
        );
    }

    ngAfterViewInit() {
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

        if (this._symbol === null) {
            this.hasChart.next(false);
            return;
        }

        // Get api data
        let chartData: ChartResultArrayDto;

        try {
            chartData = await firstValueFrom(
                this.apiService.yahooControllerChart({
                    symbol: this._symbol,
                    start: this.startDateControl.valid
                        ? this.startDateControl.value
                        : undefined,
                    interval: this.intervalControl.valid
                        ? this.intervalControl.value
                        : undefined,
                })
            );
        } catch (error: any) {
            if (error instanceof HttpErrorResponse) {
                this.chartError = (error as HttpErrorResponse).error.message;
            } else {
                this.chartError = 'Unknown error.';
            }

            this.hasChart.next(false);
            return;
        }

        // Draw chart on the canvas
        const maxVolume = Math.max(...chartData.quotes.map((s) => s.volume));
        const data: ChartData<keyof ChartTypeRegistry, number[], string> = {
            labels: chartData.quotes.map((s) =>
                DateTime.fromISO(s.date).setLocale('fr').toLocaleString()
            ),
            datasets: [
                {
                    type: 'line',
                    label: `Price (${chartData.meta.currency})`,
                    data: chartData.quotes.map((s) => s.close),
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)',
                    yAxisID: 'price-y-axis',
                },
                {
                    type: 'bar',
                    label: 'Volume',
                    data: chartData.quotes.map((s) => s.volume),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'volume-y-axis',
                },
            ],
        };

        const config: ChartConfiguration<
            keyof ChartTypeRegistry,
            number[],
            string
        > = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    'price-y-axis': {
                        type: 'linear',
                        axis: 'y',
                        position: 'right',
                    },
                    'volume-y-axis': {
                        type: 'linear',
                        axis: 'y',
                        display: false,
                        max: maxVolume * 3,
                    },
                },
            },
        };

        this.chart = new Chart(ctx, config);
        this.hasChart.next(true);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
