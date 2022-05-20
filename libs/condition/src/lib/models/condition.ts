import { ChartResultArrayDto } from '@sic/api-interfaces/models';
import { BaseIndicator, Indicator } from '@sic/indicator';
import { EqualityType } from '../types/equality-type.enum';

export class Condition {
    constructor(
        public sourceIndicator: Indicator<number[]>,
        public comparedValue: Indicator<number[]> | number,
        public equalityType: EqualityType
    ) {}

    public async evaluate(
        chartResult: ChartResultArrayDto,
        date: string
    ): Promise<boolean> {
        const sourceValue: number | null = await this.getValueAtDate(
            chartResult,
            date,
            this.sourceIndicator
        );
        const comparedValue: number | null =
            this.comparedValue instanceof BaseIndicator
                ? await this.getValueAtDate(
                      chartResult,
                      date,
                      this.comparedValue
                  )
                : this.comparedValue;

        if (sourceValue === null || comparedValue === null) {
            return false;
        }

        return this.compareValues(sourceValue, comparedValue);
    }

    private async getValueAtDate(
        chartResult: ChartResultArrayDto,
        date: string,
        indicator: Indicator<number[]>
    ): Promise<number | null> {
        const dateIndex: number | undefined = chartResult.quotes
            .map((quote, index) => {
                return { date: quote.date, index: index };
            })
            .find((x) => x.date === date)?.index;

        if (dateIndex === undefined) {
            return null;
        }

        const values = await indicator.calculate(chartResult);
        return values[dateIndex];
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
