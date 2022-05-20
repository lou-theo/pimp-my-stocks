import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseIndicator, IndicatorService } from '@sic/indicator';
import { notUndefined } from '@sic/core';

@Component({
    templateUrl: './add-indicators-dialog.component.html',
    styleUrls: ['./add-indicators-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIndicatorDialogComponent {
    public selectedIndicatorsControl: FormArray;

    constructor(
        private readonly fb: FormBuilder,
        public readonly indicatorService: IndicatorService,
        public dialogRef: MatDialogRef<AddIndicatorDialogComponent>
    ) {
        this.selectedIndicatorsControl = this.fb.array(
            this.indicatorService.flattenedIndicators.map(
                () => new FormControl()
            )
        );
    }

    public getControlAt(index: number): FormControl {
        return this.selectedIndicatorsControl.at(index) as FormControl;
    }

    public getSelectedIndicators(): BaseIndicator[] {
        const selectedIndices: { selected: boolean; index: number }[] = (
            this.selectedIndicatorsControl.value as boolean[]
        ).map((value, index) => {
            return { selected: value, index: index };
        });

        return selectedIndices
            .filter((value) => value.selected)
            .map((value) =>
                this.indicatorService.flattenedIndicators
                    .find((i) => i.index === value.index)
                    ?.factory?.createIndicator()
            )
            .filter(notUndefined);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
