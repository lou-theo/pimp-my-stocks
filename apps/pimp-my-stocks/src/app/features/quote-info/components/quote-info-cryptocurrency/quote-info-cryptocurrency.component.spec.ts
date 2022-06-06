import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteInfoCryptocurrencyComponent } from './quote-info-cryptocurrency.component';

describe('QuoteCryptocurrencyDetailComponent', () => {
    let component: QuoteInfoCryptocurrencyComponent;
    let fixture: ComponentFixture<QuoteInfoCryptocurrencyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuoteInfoCryptocurrencyComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteInfoCryptocurrencyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
