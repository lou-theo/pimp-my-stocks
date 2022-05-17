import { Component } from '@angular/core';

@Component({
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent {
    public currentSymbol: string | null = null;
}
