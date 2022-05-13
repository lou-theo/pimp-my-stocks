import { Indicator } from './indicator';
import { OnBalanceVolumeIndicator } from './obv';
import { PriceIndicator } from './price';
import { RelativeStrengthIndexIndicator } from './rsi';
import { SimpleMovingAverageIndicator } from './sma';
import { VolumeIndicator } from './volume';

export type IndicatorCategory = {
    displayName: string;
    indicators: IndicatorFactory[];
};

export type IndicatorFactory = {
    displayName: string;
    createIndicator: () => Indicator;
};

export const INDICATORS: IndicatorCategory[] = [
    {
        displayName: 'Général',
        indicators: [
            {
                displayName: 'Prix',
                createIndicator: () => new PriceIndicator(),
            },
            {
                displayName: 'Volume',
                createIndicator: () => new VolumeIndicator(),
            },
            /*
            {
                displayName: 'Support',
                createIndicator: () => new SupportIndicator(),
            },
            {
                displayName: 'Resistance',
                createIndicator: () => new ResistanceIndicator(),
            },
            */
        ],
    },
    {
        displayName: 'Moyennes mobiles',
        indicators: [
            {
                displayName: 'Simple Moving Average (SMA)',
                createIndicator: () =>
                    new SimpleMovingAverageIndicator({
                        sourceIndicator: new PriceIndicator(),
                    }),
            },
        ],
    },
    {
        displayName: 'Indicateurs',
        indicators: [
            {
                displayName: 'On-Balance Volume (OBV)',
                createIndicator: () => new OnBalanceVolumeIndicator(),
            },
            {
                displayName: 'Relative Strength Index (RSI)',
                createIndicator: () => new RelativeStrengthIndexIndicator(),
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
