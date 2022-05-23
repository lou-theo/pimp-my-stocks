import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { intersection, union } from '@sic/core';
import { ComparisonType } from '../types/comparison-type.enum';
import { Condition } from './condition';

export class ConditionGroup {
    constructor(
        public comparisonType: ComparisonType,
        public conditions: Condition[]
    ) {}

    public async evaluate(
        chartResult: ChartResultArrayDto
    ): Promise<Set<number>> {
        const evaluations: Promise<Set<number>>[] = this.conditions.map((c) =>
            c.evaluate(chartResult)
        );
        const results: Set<number>[] = await Promise.all(evaluations);

        if (this.comparisonType === ComparisonType.AND) {
            return intersection(results);
        } else {
            return union(results);
        }
    }
}
