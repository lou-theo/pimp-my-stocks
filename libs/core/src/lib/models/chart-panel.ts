import { BaseIndicator } from '../indicators/indicator';

export class ChartPanel {
    constructor(
        public readonly id: number,
        public indicators: BaseIndicator[] = []
    ) {}
}
