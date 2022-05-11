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
import { ApiService } from '@app/core/api/services';
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
    ReplaySubject,
    Subscription,
} from 'rxjs';
import { ChartResultArrayDto } from '@app/core/api/models/chart-result-array-dto';
import { ChartInterval, CHART_INTERVALS } from '@sic/api-interfaces';
import { FormControl } from '@angular/forms';
import { isBeforeDateValidator } from '@app/core/validators/before-date';
import { HttpErrorResponse } from '@angular/common/http';
import { VolumeIndicator } from '@app/core/indicators/volume';
import { PriceIndicator } from '@app/core/indicators/price';
import {
    Indicator,
    IndicatorTransformResult,
} from '@app/core/indicators/indicator';
import { ChartPanel } from '@app/core/models/chart-panel';
import { OnBalanceVolumeIndicator } from '@app/core/indicators/on-balance-volume';
import { ChartResultArrayQuoteDto } from '@app/core/api/models';

@Component({
    selector: 'sic-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
    private _symbol: string | null = null;
    @Input() set symbol(value: string | null) {
        this._symbol = value;
        this.updateChart();
    }

    public intervalControl: FormControl = new FormControl(
        '1mo' as ChartInterval
    );
    public startDateControl: FormControl = new FormControl(
        DateTime.now().minus({ years: 1 }),
        isBeforeDateValidator(DateTime.now())
    );

    private chartResult: ReplaySubject<ChartResultArrayDto | null> =
        new ReplaySubject<ChartResultArrayDto | null>();
    public chartResult$: Observable<ChartResultArrayDto | null> =
        this.chartResult.asObservable();

    private chartError: BehaviorSubject<string | null> = new BehaviorSubject<
        string | null
    >(null);
    public chartError$: Observable<string | null> =
        this.chartError.asObservable();

    CHART_INTERVALS = CHART_INTERVALS;

    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    public isLoading$: Observable<boolean> = this.isLoading.asObservable();

    private subscriptions: Subscription = new Subscription();

    public panels: ChartPanel[] = [
        new ChartPanel([new PriceIndicator(), new VolumeIndicator()]),
        new ChartPanel([new OnBalanceVolumeIndicator()]),
    ];

    constructor(private readonly apiService: ApiService) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.startDateControl.valueChanges.subscribe(() => {
                if (this.startDateControl.valid) {
                    this.updateChart();
                }
            })
        );

        this.subscriptions.add(
            this.intervalControl.valueChanges.subscribe(() => {
                this.updateChart();
            })
        );
    }

    ngAfterViewInit() {
        this.updateChart();
    }

    private async updateChart(): Promise<void> {
        this.isLoading.next(true);
        await this.getChartData();
        this.isLoading.next(false);
    }

    private async getChartData(): Promise<void> {
        this.chartResult.next(null);
        this.chartError.next(null);

        if (this._symbol === null) {
            return;
        }

        // Get api data
        let chartData: ChartResultArrayDto | null;

        try {
            chartData = await firstValueFrom(
                this.apiService.yahooControllerChart({
                    symbol: this._symbol,
                    start: this.startDateControl.valid
                        ? this.startDateControl.value.toISO()
                        : undefined,
                    interval: this.intervalControl.valid
                        ? this.intervalControl.value
                        : undefined,
                })
            );
        } catch (error: any) {
            if (error instanceof HttpErrorResponse) {
                this.chartError.next(
                    (error as HttpErrorResponse).error.message
                );
            } else {
                this.chartError.next('Unknown error.');
            }

            return;
        }

        if (chartData === null) {
            this.chartError.next('No data available.');
            return;
        }

        this.chartResult.next(chartData);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
