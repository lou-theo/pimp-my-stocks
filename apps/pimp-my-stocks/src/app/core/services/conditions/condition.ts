import { ChartDailyQuoteModel } from '@sic/commons';

export interface Condition {
    evaluate(dailyQuotes: ChartDailyQuoteModel[]): Promise<Set<number>>;
}
