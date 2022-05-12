import { OnBalanceVolumeIndicator, PriceIndicator, VolumeIndicator } from '.';
import { Indicator } from './indicator';
import { RelativeStrengthIndexIndicator } from './rsi';
import { SimpleMovingAverageIndicator } from './sma';

export const INDICATORS: Indicator[] = [
    new PriceIndicator(),
    new VolumeIndicator(),
    new OnBalanceVolumeIndicator(),
    new RelativeStrengthIndexIndicator(),
    new SimpleMovingAverageIndicator(),
];
