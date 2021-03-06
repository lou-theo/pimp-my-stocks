import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteInfoComponent } from './quote-info.component';

describe('QuoteComponent', () => {
    let component: QuoteInfoComponent;
    let fixture: ComponentFixture<QuoteInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [QuoteInfoComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(QuoteInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
