import { BaseIndicator } from '../models/indicator';

export type IndicatorFactory = {
    displayName: string;
    index: number;
    createIndicator: () => BaseIndicator;
};
