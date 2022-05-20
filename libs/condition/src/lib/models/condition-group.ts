import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { ComparisonType } from '../types/comparison-type.enum';
import { Condition } from './condition';

export class ConditionGroup {
    constructor(
        public comparisonType: ComparisonType,
        public conditions: Condition[]
    ) {}

    public async evaluate(
        chartResult: ChartResultArrayDto,
        date: string
    ): Promise<boolean> {
        const evaluations: Promise<boolean>[] = this.conditions.map((c) =>
            c.evaluate(chartResult, date)
        );
        const results: boolean[] = await Promise.all(evaluations);

        if (this.comparisonType === ComparisonType.AND) {
            return results.every((r) => r);
        } else {
            return results.some((r) => r);
        }
    }
}
