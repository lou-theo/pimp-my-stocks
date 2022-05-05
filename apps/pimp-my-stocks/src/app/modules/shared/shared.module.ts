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
@NgModule({
    declarations: [ChartComponent, QuoteSearchComponent, QuoteDetailsComponent],
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
    ],
})
export class SharedModule {}
