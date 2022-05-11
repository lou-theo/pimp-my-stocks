import { OnBalanceVolumeIndicator, PriceIndicator, VolumeIndicator } from '.';
import { Indicator } from './indicator';

export const INDICATORS: Indicator[] = [
    new PriceIndicator(),
    new VolumeIndicator(),
    new OnBalanceVolumeIndicator(),
];
