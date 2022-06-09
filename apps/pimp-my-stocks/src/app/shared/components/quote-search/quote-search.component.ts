import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {SearchQuoteDto} from "@core/api/models/search-quote-dto";
import {ApiYahooService} from "@core/api/services/api-yahoo.service";
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
    @Output() symbolSelected: EventEmitter<string> = new EventEmitter<string>();

    public searchControl: FormControl = new FormControl('');

    private quotes: BehaviorSubject<Map<string, SearchQuoteDto[]>> =
        new BehaviorSubject<Map<string, SearchQuoteDto[]>>(new Map());
    public quotes$: Observable<Map<string, SearchQuoteDto[]>> =
        this.quotes.asObservable();

    private subscriptions: Subscription = new Subscription();

    constructor(private readonly apiService: ApiYahooService) {}

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
        const mappedResults: Map<string, SearchQuoteDto[]> = new Map();

        if (value === '') {
            this.quotes.next(mappedResults);
            return;
        }

        const searchResult: SearchQuoteDto[] = await firstValueFrom(
            this.apiService.yahooControllerSearch({ query: value })
        );

        for (const result of searchResult) {
            if (mappedResults.has(result.quoteType)) {
                mappedResults.get(result.quoteType)?.push(result);
            } else {
                mappedResults.set(result.quoteType, [result]);
            }
        }

        this.quotes.next(mappedResults);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
