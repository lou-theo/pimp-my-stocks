import { Component } from '@angular/core';
import { QuoteSummaryDto } from '@sic/api-interfaces/models/quote-summary-dto';
import { ApiService } from '@sic/api-interfaces/services/api.service';
import { QuoteType } from '@sic/chart';

@Component({
    templateUrl: './quote-info.component.html',
    styleUrls: ['./quote-info.component.scss'],
})
export class QuoteInfoComponent {
    public QuoteType = QuoteType;

    public symbol: string | null = null;
    public summary: QuoteSummaryDto | null = null;

    constructor(private readonly apiService: ApiService) {}

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
