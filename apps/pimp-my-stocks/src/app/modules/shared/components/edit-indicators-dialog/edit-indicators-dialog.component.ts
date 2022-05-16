import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseIndicator } from '@sic/core/indicators';
import {
    BaseIndicatorConfigurationFormGroup,
    IndicatorConfiguration,
} from '@sic/core/indicators/indicator.configuration';
import { RemoveIndicatorsDialogComponent } from '../remove-indicators-dialog/remove-indicators-dialog.component';

export type EditConfigurationResult = {
    indicator: BaseIndicator;
    configuration: IndicatorConfiguration;
};
@Component({
    templateUrl: './edit-indicators-dialog.component.html',
    styleUrls: ['./edit-indicators-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditIndicatorsDialogComponent {
    public selectedIndicatorControl: FormControl;
    public get selectedIndicator(): BaseIndicator {
        return this.selectedIndicatorControl.value[0] as BaseIndicator;
    }

    public forms: {
        indicator: BaseIndicator;
        form: BaseIndicatorConfigurationFormGroup | null;
    }[] = [];

    constructor(
        private readonly fb: FormBuilder,
        public dialogRef: MatDialogRef<RemoveIndicatorsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public indicators: BaseIndicator[]
    ) {
        this.selectedIndicatorControl = new FormControl([indicators[0]]);

        // Create forms for the indicators
        this.forms = indicators.map((i) => {
            return {
                indicator: i,
                form: i.configurator?.getFormGroup() ?? null,
            };
        });

        console.log(this.forms);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public getSelectedIndicatorForm(): BaseIndicatorConfigurationFormGroup | null {
        return (
            this.forms.find((f) => f.indicator === this.selectedIndicator)
                ?.form ?? null
        );
    }

    public getConfigurations(): EditConfigurationResult[] {
        return this.forms
            .map((f) => ({
                indicator: f.indicator,
                configuration: f.form?.value,
            }))
            .filter((c) => c.configuration != null);
    }
}
