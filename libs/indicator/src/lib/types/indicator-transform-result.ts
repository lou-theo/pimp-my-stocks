import { ChartConfiguration, ChartDataset, ChartTypeRegistry } from 'chart.js';

export type IndicatorTransformResult = {
    datasets: ChartDataset[];
    options: ChartConfiguration['options'];
};

export type TypedIndicatorTransformResult<
    TChartType extends keyof ChartTypeRegistry
> = {
    datasets: ChartDataset<TChartType>[];
    options: ChartConfiguration<TChartType>['options'];
};
