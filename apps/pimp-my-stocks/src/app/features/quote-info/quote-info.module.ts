import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from '@features/chart/chart.module';
import { QuoteInfoCryptocurrencyComponent } from '@features/quote-info/components/quote-info-cryptocurrency/quote-info-cryptocurrency.component';
import { QuoteInfoEquityComponent } from '@features/quote-info/components/quote-info-equity/quote-info-equity.component';
import { QuoteInfoEtfComponent } from '@features/quote-info/components/quote-info-etf/quote-info-etf.component';
import { QuoteInfoRoutingModule } from '@features/quote-info/quote-info-routing.module';
import { QuoteInfoComponent } from '@features/quote-info/quote-info.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, ChartModule, QuoteInfoRoutingModule],
    declarations: [
        QuoteInfoComponent,
        QuoteInfoEtfComponent,
        QuoteInfoEquityComponent,
        QuoteInfoCryptocurrencyComponent,
    ],
    exports: [QuoteInfoRoutingModule],
})
export class QuoteInfoModule {}
