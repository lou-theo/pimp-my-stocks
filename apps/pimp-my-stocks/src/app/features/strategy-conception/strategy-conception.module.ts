import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from '@features/chart/chart.module';
import { EditConditionComponent } from '@features/strategy-conception/components/edit-condition/edit-condition.component';
import { StrategyConceptionRoutingModule } from '@features/strategy-conception/strategy-conception-routing.module';
import { StrategyConceptionComponent } from '@features/strategy-conception/strategy-conception.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        StrategyConceptionRoutingModule,
        ChartModule,
    ],
    declarations: [StrategyConceptionComponent, EditConditionComponent],
    exports: [StrategyConceptionRoutingModule],
})
export class StrategyConceptionModule {}
