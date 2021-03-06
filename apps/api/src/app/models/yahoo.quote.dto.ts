import { ApiHideProperty } from '@nestjs/swagger';
import {
    Price,
    QuoteSummaryResult,
    QuoteType,
    SummaryDetail,
    SummaryProfile,
} from 'yahoo-finance2/dist/esm/src/modules/quoteSummary-iface';
import { TopHoldingsDto } from './yahoo.holdings.dto';

export class QuoteSummaryDto implements Partial<QuoteSummaryResult> {
    quoteType?: QuoteTypeDto;
    price?: PriceDto;
    summaryProfile?: SummaryProfileDto;
    topHoldings?: TopHoldingsDto;
}

export class QuoteTypeDto implements Partial<QuoteType> {
    exchange: string;
    quoteType: string;
    symbol: string;
    underlyingSymbol: string;
    shortName: null | string;
    longName: null | string;
    firstTradeDateEpochUtc: null | Date;
    timeZoneFullName: string;
    timeZoneShortName: string;
    uuid: string;
    messageBoardId?: null | string;
    gmtOffSetMilliseconds: number;
    maxAge: number;
}

export class PriceDto implements SummaryDetail, Price {
    averageDailyVolume3Month?: number;
    exchange: string;
    exchangeName: string;
    exchangeDataDelayedBy: number;
    postMarketChangePercent?: number;
    postMarketChange?: number;
    postMarketTime?: Date;
    postMarketPrice?: number;
    postMarketSource?: string;
    preMarketChangePercent?: number;
    preMarketChange?: number;
    preMarketTime?: Date;
    preMarketPrice?: number;
    preMarketSource?: string;
    regularMarketChangePercent?: number;
    regularMarketChange?: number;
    regularMarketTime?: Date;
    regularMarketPrice?: number;
    regularMarketSource?: string;
    quoteSourceName?: string;
    quoteType: string;
    symbol: string;
    underlyingSymbol: string;
    shortName: string;
    longName: string;
    marketState: string;
    currencySymbol?: string;
    maxAge: number;
    priceHint: number;
    previousClose?: number;
    open?: number;
    dayLow?: number;
    dayHigh?: number;
    regularMarketPreviousClose?: number;
    regularMarketOpen?: number;
    regularMarketDayLow?: number;
    regularMarketDayHigh?: number;
    regularMarketVolume?: number;
    dividendRate?: number;
    dividendYield?: number;
    exDividendDate?: Date;
    payoutRatio?: number;
    fiveYearAvgDividendYield?: number;
    beta?: number;
    trailingPE?: number;
    forwardPE?: number;
    volume?: number;
    averageVolume?: number;
    averageVolume10days?: number;
    averageDailyVolume10Day?: number;
    bid?: number;
    ask?: number;
    bidSize?: number;
    askSize?: number;
    marketCap?: number;
    fiftyDayAverage?: number;
    fiftyTwoWeekLow?: number;
    fiftyTwoWeekHigh?: number;
    twoHundredDayAverage?: number;
    priceToSalesTrailing12Months?: number;
    trailingAnnualDividendRate?: number;
    trailingAnnualDividendYield?: number;
    currency: string;
    @ApiHideProperty()
    algorithm: null;
    tradeable: boolean;
    yield?: number;
    totalAssets?: number;
    navPrice?: number;
    ytdReturn?: number;
    fromCurrency: string;
    toCurrency?: string;
    lastMarket: string;
    volume24Hr?: number;
    volumeAllCurrencies?: number;
    circulatingSupply?: number;
    startDate?: Date;
    expireDate?: Date;
    openInterest?: number;
}

export class SummaryProfileDto implements Partial<SummaryProfile> {
    address1?: string;
    address2?: string;
    address3?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phone?: string;
    fax?: string;
    website?: string;
    industry?: string;
    sector?: string;
    longBusinessSummary?: string;
    fullTimeEmployees?: number;
    companyOfficers: any[];
    maxAge: number;
    twitter?: string;
    name?: string;
    startDate?: Date;
    description?: string;
}
