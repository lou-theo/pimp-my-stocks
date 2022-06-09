import { Component } from '@angular/core';
import {QuoteSummaryDto} from "@core/api/models/quote-summary-dto";
import {ApiYahooService} from "@core/api/services/api-yahoo.service";
import { QuoteType } from '@sic/commons';

@Component({
    templateUrl: './quote-info.component.html',
    styleUrls: ['./quote-info.component.scss'],
})
export class QuoteInfoComponent {
    public QuoteType = QuoteType;

    public symbol: string | null = null;
    public summary: QuoteSummaryDto | null = null;

    constructor(private readonly apiService: ApiYahooService) {}

    public setSymbol(symbol: string | null): void {
        this.symbol = symbol;
        if (!symbol) {
            this.summary = null;
        } else {
            this.apiService
                .yahooControllerQuoteSummary({
                    symbol,
                })
                .subscribe((response) => (this.summary = response));
        }
    }
}
