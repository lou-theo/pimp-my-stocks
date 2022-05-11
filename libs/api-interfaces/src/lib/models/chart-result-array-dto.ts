/* tslint:disable */
/* eslint-disable */
import { ChartMetaDto } from './chart-meta-dto';
import { ChartResultArrayQuoteDto } from './chart-result-array-quote-dto';
export interface ChartResultArrayDto {
  meta: ChartMetaDto;
  quotes: Array<ChartResultArrayQuoteDto>;
}
