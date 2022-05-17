import { FormBuilder } from '@angular/forms';
import { BaseIndicator } from './indicator';

export type IndicatorCategory = {
    displayName: string;
    indicators: IndicatorFactory[];
};

export type IndicatorFactory = {
    displayName: string;
    index: number;
    createIndicator: (fb: FormBuilder) => BaseIndicator;
};

export type FlatIndicator = {
    index: number;
    category: string;
    factory: IndicatorFactory;
};
