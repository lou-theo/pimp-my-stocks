import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { ChartInterval, isChartInterval } from '@sic/api-interfaces';
import { DateTime } from 'luxon';
import { ChartResultArray } from 'yahoo-finance2/dist/esm/src/modules/chart';
import { ChartResultArrayDto } from '../models/yahoo.chart.dto';
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
    @ApiQuery({ name: 'start', required: false })
    @ApiQuery({ name: 'interval', required: false })
    async chart(
        @Param('symbol') symbol: string,
        @Query('start') startPeriod?: string | null,
        @Query('interval') interval?: string | null
    ): Promise<ChartResultArrayDto> {
        const startPeriodDate: DateTime = DateTime.fromISO(
            startPeriod ?? DateTime.now().minus({ years: 1 }).toISO()
        );
        const chartInterval: ChartInterval =
            interval != null && isChartInterval(interval) ? interval : '1mo';

        return await this.yahooService.chart(
            symbol,
            startPeriodDate,
            chartInterval
        );
    }
}
