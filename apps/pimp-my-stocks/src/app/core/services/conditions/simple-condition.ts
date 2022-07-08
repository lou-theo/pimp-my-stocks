import { AggregationType, ChartDailyQuoteModel, EqualityType, median, notNull, sum } from '@sic/commons';
import { BaseIndicator, Indicator } from '../indicator/indicator';
import { Condition } from './condition';

export class SimpleCondition implements Condition {
    constructor(
        public aggregationType: AggregationType,
        public sourceIndicator: Indicator<(number | null)[]>,
        public range: number,
        public equalityType: EqualityType,
        public comparedValue: Indicator<(number | null)[]> | number
    ) {}

    /**
     * Evaluate the condition on the dataset.
     * @param dailyQuotes The chart data.
     * @returns An array of indexes where the condition is true.
     */
    public async evaluate(dailyQuotes: ChartDailyQuoteModel[]): Promise<Set<number>> {
        const sourceValues: (number | null)[] = await this.sourceIndicator.calculate(dailyQuotes);

        let getActualComparedValue: (index: number) => number | null;
        let indicatorComparedValues: (number | null)[] = [];

        if (this.comparedValue instanceof BaseIndicator) {
            indicatorComparedValues = await this.comparedValue.calculate(dailyQuotes);
            getActualComparedValue = (index) => indicatorComparedValues[index];
        } else {
            getActualComparedValue = (index) => this.comparedValue as number;
        }

        const matchingIndices: Set<number> = new Set();

        for (const [index, _] of sourceValues.entries()) {
            const actualSourceValue: number | null = this.aggregateRange(sourceValues, index);

            const actualComparedValue: number | null = getActualComparedValue(index);

            if (actualSourceValue === null || actualComparedValue === null) {
                continue;
            }

            if (this.compareValues(actualSourceValue, actualComparedValue)) {
                matchingIndices.add(index);
            }
        }

        return matchingIndices;
    }

    private aggregateRange(values: (number | null)[], currentIndex: number): number | null {
        const range: number[] = values
            .slice(Math.max(0, currentIndex - this.range + 1), Math.min(currentIndex + 1, values.length))
            .filter(notNull);

        switch (this.aggregationType) {
            case AggregationType.AVERAGE:
                return sum(range) / range.length;
            case AggregationType.MEDIAN:
                return median(range);
            case AggregationType.MAX:
                return Math.max(...range);
            case AggregationType.MIN:
                return Math.min(...range);
            default:
                return null;
        }
    }

    private compareValues(sourceValue: number, comparedValue: number): boolean {
        switch (this.equalityType) {
            case EqualityType.EQUAL:
                return sourceValue === comparedValue;
            case EqualityType.DIFFERENT:
                return sourceValue !== comparedValue;
            case EqualityType.INFERIOR:
                return sourceValue < comparedValue;
            case EqualityType.INFERIOR_OR_EQUAL:
                return sourceValue <= comparedValue;
            case EqualityType.SUPERIOR:
                return sourceValue > comparedValue;
            case EqualityType.SUPERIOR_OR_EQUAL:
                return sourceValue >= comparedValue;
            default:
                return false;
        }
    }
}
