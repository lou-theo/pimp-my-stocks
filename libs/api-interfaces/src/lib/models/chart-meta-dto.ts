/* tslint:disable */
/* eslint-disable */
import { ChartMetaTradingPeriodDto } from './chart-meta-trading-period-dto';
import { ChartMetaTradingPeriodsDto } from './chart-meta-trading-periods-dto';
export interface ChartMetaDto {
  chartPreviousClose?: number;
  currency: string;
  currentTradingPeriod: {
'pre'?: ChartMetaTradingPeriodDto;
'regular'?: ChartMetaTradingPeriodDto;
'post'?: ChartMetaTradingPeriodDto;
};
  dataGranularity: string;
  exchangeName: string;
  exchangeTimezoneName: string;
  firstTradeDate: null | string;
  gmtoffset: number;
  instrumentType: string;
  previousClose?: number;
  priceHint: number;
  range: string;
  regularMarketPrice: number;
  regularMarketTime: string;
  scale?: number;
  symbol: string;
  timezone: string;
  tradingPeriods?: ChartMetaTradingPeriodsDto;
  validRanges: Array<string>;
}
