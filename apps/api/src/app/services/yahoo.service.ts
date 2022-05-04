import { DateTime } from 'luxon';
import yahooFinance from 'yahoo-finance2';
import {
    ChartOptionsWithReturnArray,
    ChartResultArray,
} from 'yahoo-finance2/dist/esm/src/modules/chart';
import { QuoteSummaryOptions } from 'yahoo-finance2/dist/esm/src/modules/quoteSummary';
import { QuoteSummaryResult } from 'yahoo-finance2/dist/esm/src/modules/quoteSummary-iface';
import {
    SearchNews,
    SearchQuoteYahoo,
    SearchResult,
} from 'yahoo-finance2/dist/esm/src/modules/search';

import { Injectable } from '@nestjs/common';
import { ChartInterval, YahooApi } from '@sic/api-interfaces';

@Injectable()
export class YahooService implements YahooApi {
    public async search(query: string): Promise<SearchQuoteYahoo[]> {
        let result: SearchResult;
        try {
            result = await yahooFinance.search(query);
            return result.quotes.filter(
                (q) => q.isYahooFinance === true
            ) as SearchQuoteYahoo[];
        } catch (error: any) {
            this.handleError(query, error);
            return [];
        }
    }

    public async news(query: string): Promise<SearchNews[]> {
        let result: SearchResult;
        try {
            result = await yahooFinance.search(query);
            return result.news;
        } catch (error: any) {
            this.handleError(query, error);
            return [];
        }
    }

    public async quoteSummary(symbol: string): Promise<QuoteSummaryResult> {
        const queryOptions: QuoteSummaryOptions = {
            modules: [
                'summaryProfile', // Industry, website, description...
                'quoteType', // Exchange, quote type, symbol...
                'summaryDetail', // Price, market cap...
                'topHoldings', // Holdings for funds and ETFs
            ],
        };

        let result: QuoteSummaryResult;
        try {
            result = await yahooFinance.quoteSummary(symbol, queryOptions);
            return result;
        } catch (error: any) {
            this.handleError(symbol, error);
            return {};
        }
    }

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
            this.handleError(symbol, error);
            return null;
        }
    }

    private handleError(symbol: string, error: any): void {
        console.error(error);
        if (
            error instanceof yahooFinance.errors['FailedYahooValidationError']
        ) {
            console.warn(`Invalid result for "${symbol}": ${error.result}`);
        } else {
            console.warn(
                `Couldn't get "${symbol}": [${error.name}] ${error.message}`
            );
        }
    }
}
