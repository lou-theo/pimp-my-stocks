import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Indicator, INDICATORS } from '@sic/core/indicators';

@Component({
    selector: 'sic-indicator-dialog',
    templateUrl: './indicator-dialog.component.html',
    styleUrls: ['./indicator-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorDialogComponent {
    public selectedIndicatorsControl: FormArray;

    public INDICATORS = INDICATORS;

    constructor(
        private readonly fb: FormBuilder,
        public dialogRef: MatDialogRef<IndicatorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Indicator[]
    ) {
        const alreadySelectedIndicators: string[] = data.map((i) => i.name);

        const options: boolean[] = INDICATORS.map((indicator) =>
            alreadySelectedIndicators.includes(indicator.name)
        );

        this.selectedIndicatorsControl = this.fb.array(
            options.map((selected) => new FormControl(selected))
        );
    }

    public getControlAt(index: number): FormControl {
        return this.selectedIndicatorsControl.at(index) as FormControl;
    }

    public getSelectedIndicators(): Indicator[] {
        const selectedIndices: { selected: boolean; index: number }[] = (
            this.selectedIndicatorsControl.value as boolean[]
        ).map((value, index) => {
            return { selected: value, index: index };
        });

        return selectedIndices
            .filter((value) => value.selected)
            .map((value) => INDICATORS[value.index]);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
