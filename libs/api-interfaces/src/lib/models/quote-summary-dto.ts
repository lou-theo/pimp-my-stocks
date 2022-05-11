/* tslint:disable */
/* eslint-disable */
import { QuoteTypeDto } from './quote-type-dto';
import { SummaryDetailDto } from './summary-detail-dto';
import { SummaryProfileDto } from './summary-profile-dto';
import { TopHoldingsDto } from './top-holdings-dto';
export interface QuoteSummaryDto {
  quoteType?: QuoteTypeDto;
  summaryDetail?: SummaryDetailDto;
  summaryProfile?: SummaryProfileDto;
  topHoldings?: TopHoldingsDto;
}
