import { ChartDailyQuoteModel, ComparisonType, intersection, union } from '@sic/commons';
import { Condition } from './condition';

export class ConditionGroup implements Condition {
    constructor(public comparisonType: ComparisonType, public conditions: Condition[]) {}

    public async evaluate(dailyQuotes: ChartDailyQuoteModel[]): Promise<Set<number>> {
        const evaluations: Promise<Set<number>>[] = this.conditions.map((c) => c.evaluate(dailyQuotes));
        const results: Set<number>[] = await Promise.all(evaluations);

        if (this.comparisonType === ComparisonType.AND) {
            return intersection(results);
        } else {
            return union(results);
        }
    }
}
