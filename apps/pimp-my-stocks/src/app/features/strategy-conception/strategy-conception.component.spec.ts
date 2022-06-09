import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyConceptionComponent } from './strategy-conception.component';

describe('StrategyComponent', () => {
    let component: StrategyConceptionComponent;
    let fixture: ComponentFixture<StrategyConceptionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StrategyConceptionComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StrategyConceptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
