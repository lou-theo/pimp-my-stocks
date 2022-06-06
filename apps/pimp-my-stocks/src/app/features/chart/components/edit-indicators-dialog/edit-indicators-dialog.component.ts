import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    OnDestroy,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
    BaseIndicator,
    BaseIndicatorConfigurationFormGroup,
    IndicatorConfiguration,
} from '@sic/indicator';
import { startWith, Subscription } from 'rxjs';
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
export class EditIndicatorsDialogComponent implements OnDestroy {
    public selectedIndicatorControl: FormControl;
    public get selectedIndicator(): BaseIndicator {
        return this.selectedIndicatorControl.value[0] as BaseIndicator;
    }

    public currentForm: BaseIndicatorConfigurationFormGroup | null = null;

    public forms: {
        indicator: BaseIndicator;
        form: BaseIndicatorConfigurationFormGroup | null;
    }[] = [];

    private subscriptions: Subscription = new Subscription();

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

        this.subscriptions.add(
            this.selectedIndicatorControl.valueChanges
                .pipe(startWith(this.selectedIndicatorControl.value))
                .subscribe(() => {
                    this.currentForm =
                        this.forms.find(
                            (f) => f.indicator === this.selectedIndicator
                        )?.form ?? null;
                })
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public getConfigurations(): EditConfigurationResult[] {
        return this.forms
            .map((f) => ({
                indicator: f.indicator,
                configuration: f.form?.value,
            }))
            .filter((c) => c.configuration != null);
    }

    public getErrorMessage(control: AbstractControl): string {
        if (control.hasError('required')) {
            return 'Champ requis';
        }

        return 'Champ invalide';
    }

    public allFormsValid(): boolean {
        return this.forms.every((f) => !(f.form?.invalid ?? false));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
