import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteInfoEquityComponent } from './quote-info-equity.component';

describe('QuoteEquityDetailsComponent', () => {
    let component: QuoteInfoEquityComponent;
    let fixture: ComponentFixture<QuoteInfoEquityComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuoteInfoEquityComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteInfoEquityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
