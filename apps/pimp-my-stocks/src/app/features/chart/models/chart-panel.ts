import { BaseIndicator } from '@sic/indicator';

export class ChartPanel {
    constructor(
        public readonly id: number,
        public indicators: BaseIndicator[] = []
    ) {}
}
