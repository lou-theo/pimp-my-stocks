import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveIndicatorsDialogComponent } from './remove-indicators-dialog.component';

describe('RemoveIndicatorsDialogComponent', () => {
    let component: RemoveIndicatorsDialogComponent;
    let fixture: ComponentFixture<RemoveIndicatorsDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RemoveIndicatorsDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RemoveIndicatorsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
