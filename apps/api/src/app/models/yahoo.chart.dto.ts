import {
    ChartMeta,
    ChartMetaTradingPeriod,
    ChartMetaTradingPeriods,
    ChartResultArray,
    ChartResultArrayQuote,
} from 'yahoo-finance2/dist/esm/src/modules/chart';

export class ChartResultArrayDto implements Partial<ChartResultArray> {
    meta: ChartMetaDto;
    // TODO: add events
    quotes: Array<ChartResultArrayQuoteDto>;
}

export class ChartMetaDto implements Partial<ChartMeta> {
    currency: string;
    symbol: string;
    exchangeName: string;
    instrumentType: string;
    firstTradeDate: Date | null;
    regularMarketTime: Date;
    gmtoffset: number;
    timezone: string;
    exchangeTimezoneName: string;
    regularMarketPrice: number;
    chartPreviousClose?: number;
    previousClose?: number;
    scale?: number;
    priceHint: number;
    currentTradingPeriod: {
        pre: ChartMetaTradingPeriodDto;
        regular: ChartMetaTradingPeriodDto;
        post: ChartMetaTradingPeriodDto;
    };
    tradingPeriods?: ChartMetaTradingPeriodsDto;
    dataGranularity: string;
    range: string;
    validRanges: Array<string>;
}

export class ChartMetaTradingPeriodDto implements Partial<ChartMetaTradingPeriod> {
    timezone: string;
    start: Date;
    end: Date;
    gmtoffset: number;
}

export class ChartMetaTradingPeriodsDto implements Partial<ChartMetaTradingPeriods> {
    pre?: Array<Array<ChartMetaTradingPeriodDto>>;
    post?: Array<Array<ChartMetaTradingPeriodDto>>;
    regular?: Array<Array<ChartMetaTradingPeriodDto>>;
}

export class ChartResultArrayQuoteDto implements Partial<ChartResultArrayQuote> {
    date: Date;
    high: number;
    low: number;
    open: number;
    close: number;
    volume: number;
    adjclose?: number;
}
