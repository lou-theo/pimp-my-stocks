import { Component } from '@angular/core';
import {Condition} from "@core/services/conditions/condition";

@Component({
    templateUrl: './strategy-conception.component.html',
    styleUrls: ['./strategy-conception.component.scss'],
})
export class StrategyConceptionComponent {
    public currentSymbol: string | null = null;

    conditions: Condition[] = [];
    onConditionUpdated(condition: Condition): void {
        this.conditions = [condition];
    }
}
