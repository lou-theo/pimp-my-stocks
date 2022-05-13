import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteEquityDetailsComponent } from './quote-equity-details.component';

describe('QuoteEquityDetailsComponent', () => {
    let component: QuoteEquityDetailsComponent;
    let fixture: ComponentFixture<QuoteEquityDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuoteEquityDetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteEquityDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
