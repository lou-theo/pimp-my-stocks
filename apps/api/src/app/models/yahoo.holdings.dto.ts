import {
    TopHoldings,
    TopHoldingsHolding,
    TopHoldingsEquityHoldings,
    TopHoldingsBondRating,
    TopHoldingsSectorWeighting,
} from 'yahoo-finance2/dist/esm/src/modules/quoteSummary-iface';

export class TopHoldingsDto implements Partial<TopHoldings> {
    maxAge: number;
    stockPosition: number;
    bondPosition: number;
    holdings: TopHoldingsHoldingDto[];
    equityHoldings: TopHoldingsEquityHoldingsDto;
    bondHoldings: object;
    bondRatings: TopHoldingsBondRatingDto[];
    sectorWeightings: TopHoldingsSectorWeightingDto[];
    cashPosition?: number;
    otherPosition?: number;
    preferredPosition?: number;
    convertiblePosition?: number;
}

export class TopHoldingsHoldingDto implements Partial<TopHoldingsHolding> {
    symbol: string;
    holdingName: string;
    holdingPercent: number;
}

export class TopHoldingsEquityHoldingsDto
    implements Partial<TopHoldingsEquityHoldings>
{
    medianMarketCap?: number;
    medianMarketCapCat?: number;
    priceToBook: number;
    priceToBookCat?: number;
    priceToCashflow: number;
    priceToCashflowCat?: number;
    priceToEarnings: number;
    priceToEarningsCat?: number;
    priceToSales: number;
    priceToSalesCat?: number;
    threeYearEarningsGrowth?: number;
    threeYearEarningsGrowthCat?: number;
}

export class TopHoldingsBondRatingDto
    implements Partial<TopHoldingsBondRating>
{
    a?: number;
    aa?: number;
    aaa?: number;
    other?: number;
    b?: number;
    bb?: number;
    bbb?: number;
    below_b?: number;
    us_government?: number;
}

export class TopHoldingsSectorWeightingDto
    implements Partial<TopHoldingsSectorWeighting>
{
    realestate?: number;
    consumer_cyclical?: number;
    basic_materials?: number;
    consumer_defensive?: number;
    technology?: number;
    communication_services?: number;
    financial_services?: number;
    utilities?: number;
    industrials?: number;
    energy?: number;
    healthcare?: number;
}
