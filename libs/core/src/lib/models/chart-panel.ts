import { Indicator } from '../indicators/indicator';

export class ChartPanel {
    constructor(
        public readonly id: number,
        public indicators: Indicator[] = []
    ) {}
}
