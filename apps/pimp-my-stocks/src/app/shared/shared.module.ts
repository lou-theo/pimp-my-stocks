import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { QuoteSearchComponent } from './components/quote-search/quote-search.component';
import { QuoteDetailsComponent } from './components/quote-details/quote-details.component';

@NgModule({
    declarations: [ChartComponent, QuoteSearchComponent, QuoteDetailsComponent],
    imports: [CommonModule],
    exports: [ChartComponent, QuoteSearchComponent, QuoteDetailsComponent],
})
export class SharedModule {}
