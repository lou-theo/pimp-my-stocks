import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'sic-quote-details',
    templateUrl: './quote-details.component.html',
    styleUrls: ['./quote-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteDetailsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
