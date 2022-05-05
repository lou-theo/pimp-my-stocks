import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { QuoteSummaryDto } from '../../../../core/api/models';
import { ApiService } from '../../../../core/api/services';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

@Component({
    selector: 'sic-quote-details',
    templateUrl: './quote-details.component.html',
    styleUrls: ['./quote-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteDetailsComponent {
    @Input() set symbol(value: string | null) {
        if (value === null) {
            this.summary.next(null);
        } else {
            firstValueFrom(
                this.apiService.yahooControllerQuoteSummary({
                    symbol: value,
                })
            ).then((summary) => {
                console.log(summary);
                this.summary.next(summary);
            });
        }
    }

    private summary: BehaviorSubject<QuoteSummaryDto | null> =
        new BehaviorSubject<QuoteSummaryDto | null>(null);
    public summary$: Observable<QuoteSummaryDto | null> =
        this.summary.asObservable();

    constructor(private readonly apiService: ApiService) {}
}
