import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { BaseIndicator, Indicator } from '@sic/indicator';
import { EqualityType } from '../types/equality-type.enum';

export class Condition {
    constructor(
        public sourceIndicator: Indicator<(number | null)[]>,
        public comparedValue: Indicator<(number | null)[]> | number,
        public equalityType: EqualityType
    ) {}

    /**
     * Evaluate the condition on the dataset.
     * @param chartResult The chart data.
     * @returns An array of indexes where the condition is true.
     */
    public async evaluate(
        chartResult: ChartResultArrayDto
    ): Promise<Set<number>> {
        const sourceValues: (number | null)[] =
            await this.sourceIndicator.calculate(chartResult);

        let getActualComparedValue: (index: number) => number | null;
        let indicatorComparedValues: (number | null)[] = [];

        if (this.comparedValue instanceof BaseIndicator) {
            indicatorComparedValues = await this.comparedValue.calculate(
                chartResult
            );
            getActualComparedValue = (index) => indicatorComparedValues[index];
        } else {
            getActualComparedValue = (index) => this.comparedValue as number;
        }

        const matchingIndices: Set<number> = new Set();

        for (const [index, value] of sourceValues.entries()) {
            const actualComparedValue: number | null =
                getActualComparedValue(index);

            if (value === null || actualComparedValue === null) {
                continue;
            }

            if (this.compareValues(value, actualComparedValue)) {
                matchingIndices.add(index);
            }
        }

        return matchingIndices;
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
        }
    }
}
