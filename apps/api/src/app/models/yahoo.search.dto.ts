import {
    SearchQuoteYahoo,
    SearchNews,
} from 'yahoo-finance2/dist/esm/src/modules/search';

export class SearchQuoteDto implements Partial<SearchQuoteYahoo> {
    symbol: string;
    exchange: string;
    exchDisp?: string;
    shortname?: string;
    longname?: string;
    score: number;
    newListingDate?: Date;
    prevName?: string;
    nameChangeDate?: Date;
    quoteType: string;
}

export class SearchNewsDto implements Partial<SearchNews> {
    uuid: string;
    title: string;
    publisher: string;
    link: string;
    providerPublishTime: Date;
    type: string;
}
