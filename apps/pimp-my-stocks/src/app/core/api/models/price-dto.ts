/* tslint:disable */
/* eslint-disable */
export interface PriceDto {
  ask?: number;
  askSize?: number;
  averageDailyVolume10Day?: number;
  averageDailyVolume3Month?: number;
  averageVolume?: number;
  averageVolume10days?: number;
  beta?: number;
  bid?: number;
  bidSize?: number;
  circulatingSupply?: number;
  currency: string;
  currencySymbol?: string;
  dayHigh?: number;
  dayLow?: number;
  dividendRate?: number;
  dividendYield?: number;
  exDividendDate?: string;
  exchange: string;
  exchangeDataDelayedBy: number;
  exchangeName: string;
  expireDate?: string;
  fiftyDayAverage?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  fiveYearAvgDividendYield?: number;
  forwardPE?: number;
  fromCurrency: string;
  lastMarket: string;
  longName: string;
  marketCap?: number;
  marketState: string;
  maxAge: number;
  navPrice?: number;
  open?: number;
  openInterest?: number;
  payoutRatio?: number;
  postMarketChange?: number;
  postMarketChangePercent?: number;
  postMarketPrice?: number;
  postMarketSource?: string;
  postMarketTime?: string;
  preMarketChange?: number;
  preMarketChangePercent?: number;
  preMarketPrice?: number;
  preMarketSource?: string;
  preMarketTime?: string;
  previousClose?: number;
  priceHint: number;
  priceToSalesTrailing12Months?: number;
  quoteSourceName?: string;
  quoteType: string;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketOpen?: number;
  regularMarketPreviousClose?: number;
  regularMarketPrice?: number;
  regularMarketSource?: string;
  regularMarketTime?: string;
  regularMarketVolume?: number;
  shortName: string;
  startDate?: string;
  symbol: string;
  toCurrency?: string;
  totalAssets?: number;
  tradeable: boolean;
  trailingAnnualDividendRate?: number;
  trailingAnnualDividendYield?: number;
  trailingPE?: number;
  twoHundredDayAverage?: number;
  underlyingSymbol: string;
  volume?: number;
  volume24Hr?: number;
  volumeAllCurrencies?: number;
  yield?: number;
  ytdReturn?: number;
}
