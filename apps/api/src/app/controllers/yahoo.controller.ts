import { Controller, Get, Param } from '@nestjs/common';
import { ChartInterval } from '@sic/api-interfaces';
import { DateTime } from 'luxon';
import { ChartResultArray } from 'yahoo-finance2/dist/esm/src/modules/chart';
import { QuoteSummaryDto } from '../models/yahoo.quote.dto';
import { SearchNewsDto, SearchQuoteDto } from '../models/yahoo.search.dto';

import { YahooService } from '../services/yahoo.service';

@Controller()
export class YahooController {
    constructor(private readonly yahooService: YahooService) {}

    @Get('search/:query')
    async search(@Param('query') query: string): Promise<SearchQuoteDto[]> {
        return await this.yahooService.search(query);
    }

    @Get('news/:query')
    async news(@Param('query') query: string): Promise<SearchNewsDto[]> {
        return await this.yahooService.news(query);
    }

    @Get('quotes/:symbol/summary')
    async quoteSummary(
        @Param('symbol') symbol: string
    ): Promise<QuoteSummaryDto> {
        return await this.yahooService.quoteSummary(symbol);
    }

    @Get('quotes/:symbol/chart')
    async chart(
        @Param('symbol') symbol: string,
        startPeriod: DateTime,
        interval: ChartInterval
    ): Promise<ChartResultArray> {
        return await this.yahooService.chart(symbol, startPeriod, interval);
    }
}
