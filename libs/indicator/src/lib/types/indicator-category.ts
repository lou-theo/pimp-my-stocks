import { IndicatorFactory } from './indicator-factory';

export type IndicatorCategory = {
    displayName: string;
    indicators: IndicatorFactory[];
};
