import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteInfoEtfComponent } from './quote-info-etf.component';

describe('QuoteEtfDetailsComponent', () => {
    let component: QuoteInfoEtfComponent;
    let fixture: ComponentFixture<QuoteInfoEtfComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuoteInfoEtfComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteInfoEtfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
