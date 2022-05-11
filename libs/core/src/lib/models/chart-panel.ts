import { Indicator } from '../indicators/indicator';

export class ChartPanel {
    constructor(public readonly indicators: Indicator[] = []) {}
}
