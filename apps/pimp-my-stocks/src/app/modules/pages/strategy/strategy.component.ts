import { Component } from '@angular/core';

@Component({
    templateUrl: './strategy.component.html',
    styleUrls: ['./strategy.component.scss'],
})
export class StrategyComponent {
    public currentSymbol: string | null = null;
}
