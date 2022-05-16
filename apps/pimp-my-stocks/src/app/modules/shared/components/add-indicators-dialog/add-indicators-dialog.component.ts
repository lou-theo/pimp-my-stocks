import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
    BaseIndicator,
    IndicatorFactory,
    INDICATORS,
} from '@sic/core/indicators';
import { notUndefined } from '@sic/core/utils';

@Component({
    templateUrl: './add-indicators-dialog.component.html',
    styleUrls: ['./add-indicators-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIndicatorDialogComponent {
    public selectedIndicatorsControl: FormArray;

    public INDICATORS = INDICATORS;
    private flattenedIndicators: {
        index: number;
        factory: IndicatorFactory;
    }[] = [];

    constructor(
        private readonly fb: FormBuilder,
        public dialogRef: MatDialogRef<AddIndicatorDialogComponent>
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

    public getSelectedIndicators(): BaseIndicator[] {
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
                    ?.factory?.createIndicator(this.fb)
            )
            .filter(notUndefined);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
