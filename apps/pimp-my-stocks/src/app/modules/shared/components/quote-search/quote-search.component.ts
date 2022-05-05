import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    BehaviorSubject,
    debounceTime,
    distinctUntilChanged,
    firstValueFrom,
    Observable,
    Subscription,
} from 'rxjs';
import { SearchQuoteDto } from '../../../../core/api/models';
import { ApiService } from '../../../../core/api/services';

@Component({
    selector: 'sic-quote-search',
    templateUrl: './quote-search.component.html',
    styleUrls: ['./quote-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteSearchComponent implements OnInit, OnDestroy {
    public searchControl: FormControl = new FormControl('');

    private quotes: BehaviorSubject<Map<string, SearchQuoteDto[]>> =
        new BehaviorSubject<Map<string, SearchQuoteDto[]>>(new Map());
    public quotes$: Observable<Map<string, SearchQuoteDto[]>> =
        this.quotes.asObservable();

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

        const mappedResults: Map<string, SearchQuoteDto[]> = new Map();

        for (const result of searchResult) {
            if (mappedResults.has(result.quoteType)) {
                mappedResults.get(result.quoteType)?.push(result);
            } else {
                mappedResults.set(result.quoteType, [result]);
            }
        }

        console.log(mappedResults);
        this.quotes.next(mappedResults);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
