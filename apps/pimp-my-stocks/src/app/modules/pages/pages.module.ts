import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { QuoteComponent } from './quote/quote.component';
import { StrategyComponent } from './strategy/strategy.component';

@NgModule({
    declarations: [HomeComponent, QuoteComponent, StrategyComponent],
    imports: [SharedModule, PagesRoutingModule],
})
export class PagesModule {}
