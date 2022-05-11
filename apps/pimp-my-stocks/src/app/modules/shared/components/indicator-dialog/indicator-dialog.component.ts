import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Indicator, INDICATORS } from '@sic/core/indicators';

@Component({
    selector: 'sic-indicator-dialog',
    templateUrl: './indicator-dialog.component.html',
    styleUrls: ['./indicator-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorDialogComponent {
    public selectedIndicatorControl: FormControl = new FormControl();

    public indicators: Indicator[];

    constructor(
        public dialogRef: MatDialogRef<IndicatorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Indicator[]
    ) {
        const alreadySelectedIndicators: string[] = data.map((i) => i.name);
        this.indicators = INDICATORS.filter(
            (i) => !alreadySelectedIndicators.includes(i.name)
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
