import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChartInterval } from '@sic/commons';
import * as merge from 'deepmerge';
import { DateTime } from 'luxon';
import yahooFinance from 'yahoo-finance2';
import { ChartOptionsWithReturnArray, ChartResultArray } from 'yahoo-finance2/dist/esm/src/modules/chart';
import { QuoteSummaryOptions } from 'yahoo-finance2/dist/esm/src/modules/quoteSummary';
import { QuoteSummaryResult } from 'yahoo-finance2/dist/esm/src/modules/quoteSummary-iface';
import {
    SearchNews,
    SearchQuoteYahooCryptocurrency,
    SearchQuoteYahooCurrency,
    SearchQuoteYahooEquity,
    SearchQuoteYahooETF,
    SearchQuoteYahooFund,
    SearchQuoteYahooFuture,
    SearchQuoteYahooIndex,
    SearchQuoteYahooOption,
    SearchResult,
} from 'yahoo-finance2/dist/esm/src/modules/search';
import { PriceDto, QuoteSummaryDto } from '../models/yahoo.quote.dto';

type SearchQuoteResult =
    | SearchQuoteYahooEquity
    | SearchQuoteYahooOption
    | SearchQuoteYahooETF
    | SearchQuoteYahooFund
    | SearchQuoteYahooIndex
    | SearchQuoteYahooCurrency
    | SearchQuoteYahooCryptocurrency
    | SearchQuoteYahooFuture;

@Injectable()
export class YahooService {
    /**
     * Search for symbols, companies.
     *
     * @param query Search query.
     * @returns Found quotes (Equity, Option, ETF, Fund, Index, Currency, Cryptocurrency or Future).
     */
    public async search(query: string): Promise<SearchQuoteResult[]> {
        let result: SearchResult;
        try {
            result = await yahooFinance.search(query);
            return result.quotes.filter((q) => q.isYahooFinance === true) as SearchQuoteResult[];
        } catch (error: any) {
            return this.handleError(query, error, []);
        }
    }

    /**
     * Search for news.
     *
     * @param query Search query.
     * @returns Found news.
     */
    public async news(query: string): Promise<SearchNews[]> {
        let result: SearchResult;
        try {
            result = await yahooFinance.search(query);
            return result.news;
        } catch (error: any) {
            return this.handleError(query, error, []);
        }
    }

    /**
     * Get the details for a given quote.
     *
     * @param symbol Symbol name as used by Yahoo (often the stock ticker).
     */
    public async quoteSummary(symbol: string): Promise<QuoteSummaryDto> {
        const queryOptions: QuoteSummaryOptions = {
            modules: [
                'summaryProfile', // Industry, website, description...
                'quoteType', // Exchange, quote type, symbol...
                'summaryDetail', // Price, market cap...
                'price', // Market percent change
                'topHoldings', // Holdings for funds and ETFs
                'fundOwnership',
                'fundPerformance',
                'fundProfile',
            ],
        };

        let result: QuoteSummaryResult;
        try {
            result = await yahooFinance.quoteSummary(symbol, queryOptions);
            return {
                summaryProfile: result.summaryProfile,
                quoteType: result.quoteType,
                topHoldings: result.topHoldings,
                price: merge.all([result.topHoldings ?? {}, result.price ?? {}]) as PriceDto,
            };
        } catch (error: any) {
            return this.handleError(symbol, error, {});
        }
    }

    /**
     * Get chart data for the given quote.
     *
     * @param symbol Symbol name as used by Yahoo (often the stock ticker).
     * @param startPeriod Start date.
     * @param interval Data point interval.
     */
    public async chart(
        symbol: string,
        startPeriod: DateTime,
        interval: ChartInterval
    ): Promise<ChartResultArray | null> {
        const queryOptions: ChartOptionsWithReturnArray = {
            period1: startPeriod.toJSDate(),
            interval: interval,
        };

        let result: ChartResultArray;
        try {
            result = await yahooFinance._chart(symbol, queryOptions);
            return result;
        } catch (error: any) {
            return this.handleError(symbol, error, null);
        }
    }

    private handleError<T>(symbol: string, error: any, defaultValue: T): T {
        if (error instanceof yahooFinance.errors['FailedYahooValidationError']) {
            // Yahoo result was invalid
            console.warn(`Invalid result for "${symbol}": ${error.result}`);
            return error.result;
        } else {
            console.warn(`Couldn't get "${symbol}": [${error.name}] ${error.message}`);

            if (error instanceof yahooFinance.errors['HTTPError']) {
                return null;
            }

            // Assume this is because of an invalid request
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
