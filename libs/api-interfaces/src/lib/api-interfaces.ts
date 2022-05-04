import { DateTime } from 'luxon';
import { ChartResultArray } from 'yahoo-finance2/dist/esm/src/modules/chart';
import { QuoteSummaryResult } from 'yahoo-finance2/dist/esm/src/modules/quoteSummary-iface';
import {
  SearchNews,
  SearchQuoteNonYahoo,
  SearchQuoteYahoo,
} from 'yahoo-finance2/dist/esm/src/modules/search';

export type ChartInterval =
  | '1m'
  | '2m'
  | '5m'
  | '15m'
  | '30m'
  | '60m'
  | '90m'
  | '1h'
  | '1d'
  | '5d'
  | '1wk'
  | '1mo'
  | '3mo';

export interface YahooApi {
  /**
   * Search for symbols, companies.
   *
   * @param query Search query.
   * @returns Found quotes (Equity, Option, ETF, Fund, Index, Currency, Cryptocurrency or Future).
   */
  search(query: string): Promise<(SearchQuoteYahoo | SearchQuoteNonYahoo)[]>;

  /**
   * Search for news.
   *
   * @param query Search query.
   * @returns Found news.
   */
  news(query: string): Promise<SearchNews[]>;

  /**
   * Get the details for a given quote.
   *
   * @param symbol Symbol name as used by Yahoo (often the stock ticker).
   */
  quoteSummary(symbol: string): Promise<QuoteSummaryResult>;

  /**
   * Get chart data for the given quote.
   *
   * @param symbol Symbol name as used by Yahoo (often the stock ticker).
   * @param startPeriod Start date.
   * @param interval Data point interval.
   */
  chart(
    symbol: string,
    startPeriod: DateTime,
    interval: ChartInterval
  ): Promise<ChartResultArray | null>;
}
