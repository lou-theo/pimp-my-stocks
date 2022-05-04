import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchQuoteDto } from '@sic/core/api/models';
import { ApiService } from '@sic/core/api/services';
import { notUndefined } from '@sic/core/utils/not-undefined';
import {
    BehaviorSubject,
    debounceTime,
    distinctUntilChanged,
    firstValueFrom,
    Observable,
    Subscription,
} from 'rxjs';

@Component({
    selector: 'sic-quote-search',
    templateUrl: './quote-search.component.html',
    styleUrls: ['./quote-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteSearchComponent implements OnInit, OnDestroy {
    public searchControl: FormControl = new FormControl('');

    private quotes: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        []
    );
    public quotes$: Observable<string[]> = this.quotes.asObservable();

    private subscriptions: Subscription = new Subscription();

    constructor(private readonly apiService: ApiService) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.searchControl.valueChanges
                .pipe(distinctUntilChanged(), debounceTime(500))
                .subscribe(async (searchValue: string) => {
                    await this.onSearchValueChange(searchValue);
                })
        );
    }

    private async onSearchValueChange(value: string): Promise<void> {
        const searchResult: SearchQuoteDto[] = await firstValueFrom(
            this.apiService.yahooControllerSearch({ query: value })
        );

        const quotes: string[] = searchResult
            .map((r) => r.longname)
            .filter(notUndefined);
        this.quotes.next(quotes);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
