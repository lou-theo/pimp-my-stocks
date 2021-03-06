import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChartInterval, isChartInterval } from '@sic/commons';
import { DateTime } from 'luxon';
import { ChartResultArrayDto } from '../models/yahoo.chart.dto';
import { QuoteSummaryDto } from '../models/yahoo.quote.dto';
import { SearchNewsDto, SearchQuoteDto } from '../models/yahoo.search.dto';

import { YahooService } from '../services/yahoo.service';

@ApiTags('Yahoo')
@Controller('yahoo')
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
    @ApiResponse({ status: 200, type: QuoteSummaryDto })
    async quoteSummary(@Param('symbol') symbol: string): Promise<QuoteSummaryDto> {
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
        const startPeriodDate: DateTime = DateTime.fromISO(startPeriod ?? DateTime.now().minus({ years: 1 }).toISO());
        const chartInterval: ChartInterval = interval != null && isChartInterval(interval) ? interval : '1mo';

        return await this.yahooService.chart(symbol, startPeriodDate, chartInterval);
    }
}
