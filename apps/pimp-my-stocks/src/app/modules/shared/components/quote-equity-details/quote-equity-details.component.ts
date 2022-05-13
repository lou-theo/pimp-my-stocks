import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { QuoteSummaryDto } from '@sic/api-interfaces/models';

@Component({
    selector: 'sic-quote-equity-details',
    templateUrl: './quote-equity-details.component.html',
    styleUrls: ['./quote-equity-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteEquityDetailsComponent {
    @Input() summary: QuoteSummaryDto = {};
}
