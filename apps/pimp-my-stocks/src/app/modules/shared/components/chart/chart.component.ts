import {
    Component,
    ChangeDetectionStrategy,
    AfterViewInit,
    Input,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { ApiService } from '@sic/api-interfaces/services';
import { DateTime } from 'luxon';
import {
    BehaviorSubject,
    firstValueFrom,
    Observable,
    ReplaySubject,
    Subscription,
} from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartResultArrayDto } from '@sic/api-interfaces/models/chart-result-array-dto';
import { ChartInterval, CHART_INTERVALS, ChartPanel } from '@sic/chart';
import { isBeforeDateValidator } from '@sic/core';
import {
    PriceIndicator,
    VolumeIndicator,
    OnBalanceVolumeIndicator,
    SimpleMovingAverageIndicator,
} from '@sic/indicator';

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

    public panels: ChartPanel[];

    constructor(private readonly apiService: ApiService, fb: FormBuilder) {
        this.panels = [
            new ChartPanel(1, [
                new PriceIndicator(fb),
                new VolumeIndicator(),
                new SimpleMovingAverageIndicator(fb),
            ]),
            new ChartPanel(2, [new OnBalanceVolumeIndicator()]),
        ];
    }

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
        } catch (error: unknown) {
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

    public addPanel(panel: ChartPanel): void {
        const panelIndex: number = this.panels.indexOf(panel);
        const newId: number = Math.max(...this.panels.map((p) => p.id)) + 1;
        this.panels.splice(panelIndex + 1, 0, new ChartPanel(newId, []));
        this.panels = [...this.panels];
    }

    public removePanel(panel: ChartPanel): void {
        const panelIndex: number = this.panels.indexOf(panel);
        this.panels.splice(panelIndex, 1);
        this.panels = [...this.panels];
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
