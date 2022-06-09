/* tslint:disable */
/* eslint-disable */
import { PriceDto } from './price-dto';
import { QuoteTypeDto } from './quote-type-dto';
import { SummaryProfileDto } from './summary-profile-dto';
import { TopHoldingsDto } from './top-holdings-dto';
export interface QuoteSummaryDto {
  price?: PriceDto;
  quoteType?: QuoteTypeDto;
  summaryProfile?: SummaryProfileDto;
  topHoldings?: TopHoldingsDto;
}
