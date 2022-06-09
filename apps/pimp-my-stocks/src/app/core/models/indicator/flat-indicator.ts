import { IndicatorFactory } from './indicator-factory';

export type FlatIndicator = {
    index: number;
    category: string;
    factory: IndicatorFactory;
};
