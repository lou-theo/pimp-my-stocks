import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
    PriceIndicator,
    VolumeIndicator,
    OnBalanceVolumeIndicator,
    RelativeStrengthIndexIndicator,
    SimpleMovingAverageIndicator,
    IndicatorCategory,
    FlatIndicator,
} from '../..';

@Injectable({
    providedIn: 'root',
})
export class IndicatorService {
    public readonly indicators: IndicatorCategory[];
    public readonly flattenedIndicators: FlatIndicator[];

    constructor(private readonly fb: FormBuilder) {
        let i = 0;
        this.indicators = [
            {
                displayName: 'Général',
                indicators: [
                    {
                        displayName: 'Prix',
                        index: i++,
                        createIndicator: () => new PriceIndicator(fb),
                    },
                    {
                        displayName: 'Volume',
                        index: i++,
                        createIndicator: () => new VolumeIndicator(),
                    },
                ],
            },
            {
                displayName: 'Moyennes mobiles',
                indicators: [
                    {
                        displayName: 'Simple Moving Average (SMA)',
                        index: i++,
                        createIndicator: () =>
                            new SimpleMovingAverageIndicator(fb),
                    },
                ],
            },
            {
                displayName: 'Indicateurs',
                indicators: [
                    {
                        displayName: 'On-Balance Volume (OBV)',
                        index: i++,
                        createIndicator: () => new OnBalanceVolumeIndicator(),
                    },
                    {
                        displayName: 'Relative Strength Index (RSI)',
                        index: i++,
                        createIndicator: () =>
                            new RelativeStrengthIndexIndicator(fb),
                    },
                ],
            },
            {
                displayName: 'Oscillateurs',
                indicators: [],
            },
            {
                displayName: 'Bandes',
                indicators: [],
            },
            {
                displayName: 'Statistiques',
                indicators: [],
            },
        ];

        this.flattenedIndicators = [];
        for (const category of this.indicators) {
            for (const indicator of category.indicators) {
                this.flattenedIndicators.push({
                    index: indicator.index,
                    category: category.displayName,
                    factory: indicator,
                });
            }
        }
    }
}
