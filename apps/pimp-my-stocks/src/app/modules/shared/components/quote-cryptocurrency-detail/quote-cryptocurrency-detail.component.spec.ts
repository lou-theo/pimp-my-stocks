import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCryptocurrencyDetailComponent } from './quote-cryptocurrency-detail.component';

describe('QuoteCryptocurrencyDetailComponent', () => {
    let component: QuoteCryptocurrencyDetailComponent;
    let fixture: ComponentFixture<QuoteCryptocurrencyDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuoteCryptocurrencyDetailComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteCryptocurrencyDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
