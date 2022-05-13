import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { QuoteSummaryDto } from '@sic/api-interfaces/models';

@Component({
    selector: 'sic-quote-cryptocurrency-detail',
    templateUrl: './quote-cryptocurrency-detail.component.html',
    styleUrls: ['./quote-cryptocurrency-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCryptocurrencyDetailComponent {
    @Input() summary: QuoteSummaryDto = {};
}
