import {BaseIndicator} from "@core/services/indicator/indicator";

export class ChartPanel {
    constructor(
        public readonly id: number,
        public indicators: BaseIndicator[] = []
    ) {}
}
