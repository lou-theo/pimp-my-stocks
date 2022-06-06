import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnDestroy,
    Output,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import {
    EditConfigurationResult,
    EditIndicatorsDialogComponent,
} from '@features/chart/components/edit-indicators-dialog/edit-indicators-dialog.component';
import {
    AggregationType,
    AggregationTypeLabelMapping,
    Condition,
    EqualityType,
    EqualityTypeLabelMapping,
} from '@sic/condition';
import { BaseIndicator, Indicator, IndicatorService } from '@sic/indicator';
import { Subscription } from 'rxjs';

type ConditionForm = {
    aggregationType: AggregationType;
    indicator: Indicator<number[]>;
    range: number;
    equalityType: EqualityType;
    comparedValue: number;
};

@Component({
    selector: 'sic-edit-condition',
    templateUrl: './edit-condition.component.html',
    styleUrls: ['./edit-condition.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditConditionComponent implements OnDestroy {
    AggregationTypeLabelMapping = AggregationTypeLabelMapping;
    EqualityTypeLabelMapping = EqualityTypeLabelMapping;

    @Output()
    conditionUpdated: EventEmitter<Condition> = new EventEmitter<Condition>();

    public conditionFormGroup: FormGroup;

    private subscription: Subscription = new Subscription();

    constructor(
        public readonly indicatorService: IndicatorService,
        public readonly fb: FormBuilder,
        public readonly dialog: MatDialog
    ) {
        const formControls: { [key in keyof ConditionForm]: AbstractControl } =
            {
                aggregationType: fb.control(null, Validators.required),
                indicator: fb.control(null, Validators.required),
                range: fb.control(null, Validators.required),
                equalityType: fb.control(null, Validators.required),
                comparedValue: fb.control(null, Validators.required),
            };

        this.conditionFormGroup = fb.group(formControls);

        this.subscription.add(
            this.conditionFormGroup.valueChanges.subscribe(
                (formValue: ConditionForm) => {
                    if (this.conditionFormGroup.valid) {
                        this.emitCondition(formValue);
                    }
                }
            )
        );
    }

    public getControlFor(controlName: keyof ConditionForm): FormControl {
        return this.conditionFormGroup.get(controlName) as FormControl;
    }

    public onIndicatorSelected(selection: MatSelectChange) {
        const indicator = (selection.value as () => BaseIndicator)();
        this.getControlFor('indicator').setValue(indicator);
    }

    public openEditDialog(): void {
        const dialogRef = this.dialog.open(EditIndicatorsDialogComponent, {
            width: '80%',
            height: '80%',
            data: [this.getControlFor('indicator').value],
        });

        dialogRef
            .afterClosed()
            .subscribe((result: EditConfigurationResult[] | undefined) => {
                if (result === undefined) {
                    return;
                }

                const configurationResult = result[0];
                const indicator = this.getControlFor('indicator').value;

                if (
                    indicator === undefined ||
                    indicator.configurator === null
                ) {
                    return;
                }

                indicator.configurator.updateConfiguration(
                    configurationResult.configuration
                );

                this.emitCondition(this.conditionFormGroup.value);
            });
    }

    private emitCondition(formValue: ConditionForm) {
        this.conditionUpdated.emit(
            new Condition(
                formValue.aggregationType,
                formValue.indicator,
                formValue.range,
                formValue.equalityType,
                formValue.comparedValue
            )
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
