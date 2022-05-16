import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { QuoteSearchComponent } from './components/quote-search/quote-search.component';
import { QuoteDetailsComponent } from './components/quote-details/quote-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormulaChartComponent } from './components/formula-chart/formula-chart.component';
import { AddIndicatorDialogComponent } from './components/add-indicators-dialog/add-indicators-dialog.component';
import { QuoteEquityDetailsComponent } from './components/quote-equity-details/quote-equity-details.component';
import { QuoteCryptocurrencyDetailComponent } from './components/quote-cryptocurrency-detail/quote-cryptocurrency-detail.component';
import { QuoteEtfDetailsComponent } from './components/quote-etf-details/quote-etf-details.component';
import { RemoveIndicatorsDialogComponent } from './components/remove-indicators-dialog/remove-indicators-dialog.component';
import { EditIndicatorsDialogComponent } from './components/edit-indicators-dialog/edit-indicators-dialog.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [
        ChartComponent,
        QuoteSearchComponent,
        QuoteDetailsComponent,
        FormulaChartComponent,
        AddIndicatorDialogComponent,
        QuoteEquityDetailsComponent,
        QuoteCryptocurrencyDetailComponent,
        QuoteEtfDetailsComponent,
        RemoveIndicatorsDialogComponent,
        EditIndicatorsDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartComponent,
        QuoteSearchComponent,
        QuoteDetailsComponent,
        FlexLayoutModule,
        FormulaChartComponent,
        AddIndicatorDialogComponent,
        MaterialModule,
    ],
})
export class SharedModule {}
