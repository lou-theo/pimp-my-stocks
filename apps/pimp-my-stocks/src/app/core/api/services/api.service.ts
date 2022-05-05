/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ChartResultArrayDto } from '../models/chart-result-array-dto';
import { QuoteSummaryDto } from '../models/quote-summary-dto';
import { SearchNewsDto } from '../models/search-news-dto';
import { SearchQuoteDto } from '../models/search-quote-dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation yahooControllerSearch
   */
  static readonly YahooControllerSearchPath = '/api/search/{query}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `yahooControllerSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  yahooControllerSearch$Response(params: {
    query: string;
  }): Observable<StrictHttpResponse<Array<SearchQuoteDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.YahooControllerSearchPath, 'get');
    if (params) {
      rb.path('query', params.query, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SearchQuoteDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `yahooControllerSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  yahooControllerSearch(params: {
    query: string;
  }): Observable<Array<SearchQuoteDto>> {

    return this.yahooControllerSearch$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SearchQuoteDto>>) => r.body as Array<SearchQuoteDto>)
    );
  }

  /**
   * Path part for operation yahooControllerNews
   */
  static readonly YahooControllerNewsPath = '/api/news/{query}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `yahooControllerNews()` instead.
   *
   * This method doesn't expect any request body.
   */
  yahooControllerNews$Response(params: {
    query: string;
  }): Observable<StrictHttpResponse<Array<SearchNewsDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.YahooControllerNewsPath, 'get');
    if (params) {
      rb.path('query', params.query, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SearchNewsDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `yahooControllerNews$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  yahooControllerNews(params: {
    query: string;
  }): Observable<Array<SearchNewsDto>> {

    return this.yahooControllerNews$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SearchNewsDto>>) => r.body as Array<SearchNewsDto>)
    );
  }

  /**
   * Path part for operation yahooControllerQuoteSummary
   */
  static readonly YahooControllerQuoteSummaryPath = '/api/quotes/{symbol}/summary';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `yahooControllerQuoteSummary()` instead.
   *
   * This method doesn't expect any request body.
   */
  yahooControllerQuoteSummary$Response(params: {
    symbol: string;
  }): Observable<StrictHttpResponse<QuoteSummaryDto>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.YahooControllerQuoteSummaryPath, 'get');
    if (params) {
      rb.path('symbol', params.symbol, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<QuoteSummaryDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `yahooControllerQuoteSummary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  yahooControllerQuoteSummary(params: {
    symbol: string;
  }): Observable<QuoteSummaryDto> {

    return this.yahooControllerQuoteSummary$Response(params).pipe(
      map((r: StrictHttpResponse<QuoteSummaryDto>) => r.body as QuoteSummaryDto)
    );
  }

  /**
   * Path part for operation yahooControllerChart
   */
  static readonly YahooControllerChartPath = '/api/quotes/{symbol}/chart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `yahooControllerChart()` instead.
   *
   * This method doesn't expect any request body.
   */
  yahooControllerChart$Response(params: {
    symbol: string;
    start?: string;
    interval?: string;
  }): Observable<StrictHttpResponse<ChartResultArrayDto>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.YahooControllerChartPath, 'get');
    if (params) {
      rb.path('symbol', params.symbol, {});
      rb.query('start', params.start, {});
      rb.query('interval', params.interval, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ChartResultArrayDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `yahooControllerChart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  yahooControllerChart(params: {
    symbol: string;
    start?: string;
    interval?: string;
  }): Observable<ChartResultArrayDto> {

    return this.yahooControllerChart$Response(params).pipe(
      map((r: StrictHttpResponse<ChartResultArrayDto>) => r.body as ChartResultArrayDto)
    );
  }

}
