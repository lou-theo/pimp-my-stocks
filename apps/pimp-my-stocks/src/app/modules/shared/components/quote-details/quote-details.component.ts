import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuoteSummaryDto } from '@sic/api-interfaces/models';
import { ApiService } from '@sic/api-interfaces/services';
import { QuoteType } from '@sic/chart';

@Component({
    selector: 'sic-quote-details',
    templateUrl: './quote-details.component.html',
    styleUrls: ['./quote-details.component.scss'],
})
export class QuoteDetailsComponent implements OnChanges {
    public QuoteType = QuoteType;

    @Input() symbol: string | null = null;

    public summary: QuoteSummaryDto | null = null;

    constructor(private readonly apiService: ApiService) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['symbol']) {
            const symbol: string | undefined = changes['symbol']?.currentValue;
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
}
