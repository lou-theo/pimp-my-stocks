import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Indicator, IndicatorFactory, INDICATORS } from '@sic/core/indicators';
import { notUndefined } from '@sic/core/utils';

@Component({
    selector: 'sic-indicator-dialog',
    templateUrl: './indicator-dialog.component.html',
    styleUrls: ['./indicator-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorDialogComponent {
    public selectedIndicatorsControl: FormArray;

    public INDICATORS = INDICATORS;
    private flattenedIndicators: {
        index: number;
        factory: IndicatorFactory;
    }[] = [];

    constructor(
        private readonly fb: FormBuilder,
        public dialogRef: MatDialogRef<IndicatorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Indicator[]
    ) {
        let i = 0;
        for (const category of INDICATORS) {
            for (const indicator of category.indicators) {
                this.flattenedIndicators.push({
                    index: i,
                    factory: indicator,
                });
                i++;
            }
        }

        this.selectedIndicatorsControl = this.fb.array(
            this.flattenedIndicators.map(() => new FormControl())
        );
    }

    public getControlFor(name: string): FormControl {
        const index =
            this.flattenedIndicators.find((i) => i.factory.displayName === name)
                ?.index ?? -1;
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
            .map((value) =>
                this.flattenedIndicators
                    .find((i) => i.index === value.index)
                    ?.factory?.createIndicator()
            )
            .filter(notUndefined);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
