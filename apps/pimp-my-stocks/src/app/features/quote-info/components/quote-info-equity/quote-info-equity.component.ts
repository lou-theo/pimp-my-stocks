import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { QuoteSummaryDto } from '@sic/api-interfaces/models';

@Component({
    selector: 'sic-quote-equity-details',
    templateUrl: './quote-info-equity.component.html',
    styleUrls: ['./quote-info-equity.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteInfoEquityComponent {
    @Input() summary: QuoteSummaryDto = {};
}
