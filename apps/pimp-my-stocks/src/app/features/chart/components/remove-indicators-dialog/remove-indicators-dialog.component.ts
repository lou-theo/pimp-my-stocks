import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {BaseIndicator} from "@core/services/indicator/indicator";

@Component({
    templateUrl: './remove-indicators-dialog.component.html',
    styleUrls: ['./remove-indicators-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveIndicatorsDialogComponent {
    public selectedIndicatorsControl: FormArray;

    constructor(
        private readonly fb: FormBuilder,
        public dialogRef: MatDialogRef<RemoveIndicatorsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public indicators: BaseIndicator[]
    ) {
        this.selectedIndicatorsControl = this.fb.array(
            indicators.map(() => new FormControl())
        );
    }

    public getControlAt(index: number): FormControl {
        return this.selectedIndicatorsControl.at(index) as FormControl;
    }

    public getSelectedIndicators(): BaseIndicator[] {
        const selectedIndices: number[] = (
            this.selectedIndicatorsControl.value as boolean[]
        )
            .map((value, index) => {
                return { selected: value, index: index };
            })
            .filter((x) => x.selected)
            .map((x) => x.index);

        return selectedIndices.map((value) => this.indicators[value]);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
