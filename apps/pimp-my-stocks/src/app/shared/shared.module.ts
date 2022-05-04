import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { QuoteSearchComponent } from './components/quote-search/quote-search.component';
import { QuoteDetailsComponent } from './components/quote-details/quote-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ChartComponent, QuoteSearchComponent, QuoteDetailsComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChartComponent,
        QuoteSearchComponent,
        QuoteDetailsComponent,
    ],
})
export class SharedModule {}
