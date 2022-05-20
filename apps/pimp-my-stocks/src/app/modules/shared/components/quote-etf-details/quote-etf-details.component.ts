import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { QuoteSummaryDto } from '@sic/api-interfaces/models';

type ChartAndCanvas = {
    label: string;
    getLabels: (summary: QuoteSummaryDto) => string[];
    getValues: (summary: QuoteSummaryDto) => number[];
    chart: echarts.ECharts | null;
    canvas: ElementRef<HTMLCanvasElement> | undefined;
};

@Component({
    selector: 'sic-quote-etf-details',
    templateUrl: './quote-etf-details.component.html',
    styleUrls: ['./quote-etf-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteEtfDetailsComponent implements AfterViewInit {
    @ViewChild('typeChart') typeChartCanvas?: ElementRef<HTMLCanvasElement>;
    @ViewChild('sectorChart') sectorChartCanvas?: ElementRef<HTMLCanvasElement>;
    @ViewChild('holdingsChart')
    holdingsChartCanvas?: ElementRef<HTMLCanvasElement>;

    @Input() summary: QuoteSummaryDto = {};

    public topHoldingsPercent = 0;

    private charts: ChartAndCanvas[] = [];

    ngAfterViewInit(): void {
        this.charts.push({
            canvas: this.typeChartCanvas,
            chart: null,
            label: "Type d'actifs",
            getLabels: (s) => ['Obligations', 'Actions', 'Autres'],
            getValues: (s) => {
                const result: number[] = [
                    (s.topHoldings?.bondPosition ?? 0) * 100,
                    (s.topHoldings?.stockPosition ?? 0) * 100,
                ];
                const other: number = 100 - result.reduce((p, c) => p + c, 0);
                result.push(other);
                return result;
            },
        });

        this.charts.push({
            canvas: this.sectorChartCanvas,
            chart: null,
            label: 'Secteurs',
            getLabels: (s) => {
                const labels =
                    s.topHoldings?.sectorWeightings.map(
                        (s) => Object.keys(s)[0]
                    ) ?? [];
                labels.push('Autres');
                return labels;
            },
            getValues: (s) => {
                const result: number[] =
                    s.topHoldings?.sectorWeightings.map(
                        (s) => Object.values(s)[0] * 100
                    ) ?? [];
                const other: number = 100 - result.reduce((p, c) => p + c, 0);
                result.push(other);
                return result;
            },
        });

        this.topHoldingsPercent =
            this.summary.topHoldings?.holdings
                .map((s) => s.holdingPercent * 100)
                .reduce((p, c) => p + c, 0) ?? 0;
        this.charts.push({
            canvas: this.holdingsChartCanvas,
            chart: null,
            label: 'Positions',
            getLabels: (s) => {
                const labels =
                    s.topHoldings?.holdings.map((s) => s.holdingName) ?? [];
                return labels;
            },
            getValues: (s) => {
                const result: number[] =
                    s.topHoldings?.holdings.map(
                        (s) => s.holdingPercent * 100
                    ) ?? [];
                return result;
            },
        });

        this.redrawCharts();
    }

    private redrawCharts() {
        for (const chart of this.charts) {
            this.redrawChart(chart);
        }
    }

    private redrawChart(chart: ChartAndCanvas): void {
        if (chart.canvas === undefined) {
            return;
        }

        const ctx: CanvasRenderingContext2D | null =
            chart.canvas.nativeElement.getContext('2d');

        if (ctx === null) {
            return;
        }

        // TODO: update this to use echarts
        /*
        // Reset the chart
        if (chart.chart != null) {
            chart.chart.destroy();
            chart.chart = null;
        }

        // Draw chart on the canvas
        const data: ChartData<
            keyof ChartTypeRegistry,
            (number | null)[],
            string
        > = {
            labels: chart.getLabels(this.summary),
            datasets: [
                {
                    label: chart.label,
                    data: chart.getValues(this.summary),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                    ],
                    hoverOffset: 4,
                },
            ],
        };

        const config: ChartConfiguration<
            keyof ChartTypeRegistry,
            (number | null)[],
            string
        > = {
            type: 'doughnut',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        };

        chart.chart = new Chart(ctx, config);*/
    }
}
