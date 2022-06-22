import { Component } from '@angular/core';
import { Condition } from '@core/services/conditions/condition';

@Component({
    templateUrl: './strategy-conception.component.html',
    styleUrls: ['./strategy-conception.component.scss'],
})
export class StrategyConceptionComponent {
    public currentSymbol: string | null = null;

    public entryConditions: Condition[] = [];
    public exitConditions: Condition[] = [];

    onEntryConditionUpdated(condition: Condition): void {
        this.entryConditions = [condition];
    }

    onExitConditionUpdated(condition: Condition): void {
        this.exitConditions = [condition];
    }
}
