import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddIndicatorDialogComponent } from '@features/chart/components/add-indicators-dialog/add-indicators-dialog.component';
import { ChartComponent } from '@features/chart/components/chart/chart.component';
import { EditIndicatorsDialogComponent } from '@features/chart/components/edit-indicators-dialog/edit-indicators-dialog.component';
import { FormulaChartComponent } from '@features/chart/components/formula-chart/formula-chart.component';
import { RemoveIndicatorsDialogComponent } from '@features/chart/components/remove-indicators-dialog/remove-indicators-dialog.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        ChartComponent,
        AddIndicatorDialogComponent,
        EditIndicatorsDialogComponent,
        FormulaChartComponent,
        RemoveIndicatorsDialogComponent,
    ],
    exports: [ChartComponent],
})
export class ChartModule {}
