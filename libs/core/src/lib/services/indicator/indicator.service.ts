import { Injectable } from '@angular/core';
import {
    FlatIndicator,
    IndicatorCategory,
    PriceIndicator,
    VolumeIndicator,
    OnBalanceVolumeIndicator,
    RelativeStrengthIndexIndicator,
    SimpleMovingAverageIndicator,
} from '../../indicators';

@Injectable({
    providedIn: 'root',
})
export class IndicatorService {
    public readonly indicators: IndicatorCategory[];
    public readonly flattenedIndicators: FlatIndicator[];

    constructor() {
        let i = 0;
        this.indicators = [
            {
                displayName: 'Général',
                indicators: [
                    {
                        displayName: 'Prix',
                        index: i++,
                        createIndicator: () => new PriceIndicator(),
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
                        createIndicator: (fb) =>
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
                        createIndicator: (fb) =>
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
