/* tslint:disable */
/* eslint-disable */
import { TopHoldingsBondRatingDto } from './top-holdings-bond-rating-dto';
import { TopHoldingsEquityHoldingsDto } from './top-holdings-equity-holdings-dto';
import { TopHoldingsHoldingDto } from './top-holdings-holding-dto';
import { TopHoldingsSectorWeightingDto } from './top-holdings-sector-weighting-dto';
export interface TopHoldingsDto {
  bondHoldings: {
};
  bondPosition: number;
  bondRatings: Array<TopHoldingsBondRatingDto>;
  cashPosition?: number;
  convertiblePosition?: number;
  equityHoldings: TopHoldingsEquityHoldingsDto;
  holdings: Array<TopHoldingsHoldingDto>;
  maxAge: number;
  otherPosition?: number;
  preferredPosition?: number;
  sectorWeightings: Array<TopHoldingsSectorWeightingDto>;
  stockPosition: number;
}
