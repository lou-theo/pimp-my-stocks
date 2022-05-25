import { Component } from '@angular/core';
import { Condition } from '@sic/condition';

@Component({
    templateUrl: './strategy.component.html',
    styleUrls: ['./strategy.component.scss'],
})
export class StrategyComponent {
    public currentSymbol: string | null = null;

    conditions: Condition[] = [];
    onConditionUpdated(condition: Condition): void {
        this.conditions = [condition];
    }
}
