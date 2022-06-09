import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaChartComponent } from './formula-chart.component';

describe('FormulaChartComponent', () => {
    let component: FormulaChartComponent;
    let fixture: ComponentFixture<FormulaChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormulaChartComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormulaChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
