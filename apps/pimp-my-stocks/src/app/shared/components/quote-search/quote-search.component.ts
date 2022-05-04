import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sic-quote-search',
    templateUrl: './quote-search.component.html',
    styleUrls: ['./quote-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteSearchComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
