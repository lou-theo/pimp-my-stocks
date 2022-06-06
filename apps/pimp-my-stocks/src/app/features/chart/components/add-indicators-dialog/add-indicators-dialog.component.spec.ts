import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIndicatorDialogComponent } from './add-indicators-dialog.component';

describe('IndicatorDialogComponent', () => {
    let component: AddIndicatorDialogComponent;
    let fixture: ComponentFixture<AddIndicatorDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddIndicatorDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddIndicatorDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
