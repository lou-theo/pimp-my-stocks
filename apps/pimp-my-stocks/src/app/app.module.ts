import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { QuoteInfoModule } from '@features/quote-info/quote-info.module';
import { ChartModule } from '@features/chart/chart.module';
import { HomeModule } from '@features/home/home.module';
import { StrategyConceptionModule } from '@features/strategy-conception/strategy-conception.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,

        // Features Modules
        HomeModule,
        QuoteInfoModule,
        StrategyConceptionModule,
        ChartModule,

        SharedModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
