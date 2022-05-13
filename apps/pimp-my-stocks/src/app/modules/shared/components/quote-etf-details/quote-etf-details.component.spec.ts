import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteEtfDetailsComponent } from './quote-etf-details.component';

describe('QuoteEtfDetailsComponent', () => {
    let component: QuoteEtfDetailsComponent;
    let fixture: ComponentFixture<QuoteEtfDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuoteEtfDetailsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteEtfDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
