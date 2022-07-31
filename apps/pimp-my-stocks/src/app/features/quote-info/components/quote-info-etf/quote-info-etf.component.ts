import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';
import { QuoteSummaryDto } from '@core/api/models/quote-summary-dto';
import { roundDecimal } from '@sic/commons';
import * as echarts from 'echarts';

type ChartAndCanvas = {
    label: string;
    getLabels: (summary: QuoteSummaryDto) => string[];
    getValues: (summary: QuoteSummaryDto) => number[];
    chart: echarts.ECharts | null;
    canvas: ElementRef<HTMLDivElement> | undefined;
};

@Component({
    selector: 'sic-quote-etf-details',
    templateUrl: './quote-info-etf.component.html',
    styleUrls: ['./quote-info-etf.component.scss'],
})
export class QuoteInfoEtfComponent implements AfterViewInit, OnDestroy {
    @ViewChild('typeChart') typeChartCanvas?: ElementRef<HTMLDivElement>;
    @ViewChild('sectorChart') sectorChartCanvas?: ElementRef<HTMLDivElement>;
    @ViewChild('holdingsChart') holdingsChartCanvas?: ElementRef<HTMLDivElement>;

    @Input() summary: QuoteSummaryDto = {};

    public topHoldingsPercent = 0;

    private charts: ChartAndCanvas[] = [];

    @HostListener('window:resize')
    private onResize() {
        for (const chart of this.charts) {
            chart.chart?.resize();
        }
    }

    public ngAfterViewInit(): void {
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
                const labels = s.topHoldings?.sectorWeightings.map((s) => Object.keys(s)[0]) ?? [];
                labels.push('Autres');
                return labels;
            },
            getValues: (s) => {
                const result: number[] = s.topHoldings?.sectorWeightings.map((s) => Object.values(s)[0] * 100) ?? [];
                const other: number = 100 - result.reduce((p, c) => p + c, 0);
                result.push(other);
                return result;
            },
        });

        this.charts.push({
            canvas: this.holdingsChartCanvas,
            chart: null,
            label: 'Positions',
            getLabels: (s) => {
                return s.topHoldings?.holdings.map((s) => s.holdingName) ?? [];
            },
            getValues: (s) => {
                return s.topHoldings?.holdings.map((s) => s.holdingPercent * 100) ?? [];
            },
        });

        this.topHoldingsPercent = roundDecimal(
            this.summary.topHoldings?.holdings.map((s) => s.holdingPercent * 100).reduce((p, c) => p + c, 0) ?? 0
        );

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

        // Reset the chart
        if (chart.chart != null) {
            chart.chart.dispose();
            chart.chart = null;
        }
        const chartValues: number[] = chart.getValues(this.summary);

        chart.chart = echarts.init(chart.canvas.nativeElement);
        chart.chart.setOption({
            legend: {
                show: false,
            },
            tooltip: {
                trigger: 'item',
            },
            series: [
                {
                    type: 'pie',
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8,
                    },
                    data: chart.getLabels(this.summary).map((label, index) => {
                        return { name: label, value: roundDecimal(chartValues[index]) };
                    }),
                },
            ],
        });
    }

    ngOnDestroy(): void {
        for (const chart of this.charts) {
            chart.chart?.dispose();
        }
    }
}
