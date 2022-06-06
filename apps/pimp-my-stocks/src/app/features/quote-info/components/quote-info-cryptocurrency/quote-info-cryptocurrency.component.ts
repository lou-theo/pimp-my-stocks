import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { QuoteSummaryDto } from '@sic/api-interfaces/models';

@Component({
    selector: 'sic-quote-cryptocurrency-detail',
    templateUrl: './quote-info-cryptocurrency.component.html',
    styleUrls: ['./quote-info-cryptocurrency.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteInfoCryptocurrencyComponent {
    @Input() summary: QuoteSummaryDto = {};
}
