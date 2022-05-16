import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndicatorsDialogComponent } from './edit-indicators-dialog.component';

describe('EditIndicatorsDialogComponent', () => {
    let component: EditIndicatorsDialogComponent;
    let fixture: ComponentFixture<EditIndicatorsDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditIndicatorsDialogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditIndicatorsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
