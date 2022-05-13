import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { QuoteSearchComponent } from './components/quote-search/quote-search.component';
import { QuoteDetailsComponent } from './components/quote-details/quote-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormulaChartComponent } from './components/formula-chart/formula-chart.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddIndicatorDialogComponent } from './components/add-indicators-dialog/add-indicators-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { QuoteEquityDetailsComponent } from './components/quote-equity-details/quote-equity-details.component';
import { QuoteCryptocurrencyDetailComponent } from './components/quote-cryptocurrency-detail/quote-cryptocurrency-detail.component';
import { QuoteEtfDetailsComponent } from './components/quote-etf-details/quote-etf-details.component';

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
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatLuxonDateModule,
        MatCardModule,
        MatDividerModule,
        MatProgressBarModule,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatCheckboxModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartComponent,
        QuoteSearchComponent,
        QuoteDetailsComponent,
        MatAutocompleteModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatButtonToggleModule,
        MatDatepickerModule,
        MatCardModule,
        MatDividerModule,
        MatProgressBarModule,
        FormulaChartComponent,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        AddIndicatorDialogComponent,
        MatRadioModule,
        MatCheckboxModule,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'fr' }],
})
export class SharedModule {}
