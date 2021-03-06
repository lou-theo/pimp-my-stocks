export type IndicatorTransformResult = {
    /**
     * The label used by this indicator.
     */
    label: string;

    /**
     * The indentifier used by this indicator.
     */
    identifier: string;

    /**
     * The id of the y axis used by the indicator.
     * If `yAxis` is not undefined, `yAxisId` will be equal to `yAxis.id`.
     */
    yAxisId: string;

    /**
     * The values to display in the chart.
     */
    dataset: (number | null)[];

    /**
     * The y axis used by this indicator. It it is `undefined`, the axis used will be the one with the id `yAxisId`.
     */
    yAxis?: any;

    /**
     * Series for this dataset.
     */
    series: any;
};
