import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {
    AggregationType,
    AggregationTypeLabelMapping,
    EqualityType,
    EqualityTypeLabelMapping,
} from '@sic/condition';
import { IndicatorService } from '@sic/indicator';

type ConditionForm = {
    aggregationType: AggregationType;
    indicatorIndex: number;
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
export class EditConditionComponent {
    AggregationTypeLabelMapping = AggregationTypeLabelMapping;
    EqualityTypeLabelMapping = EqualityTypeLabelMapping;

    public conditionFormGroup: FormGroup;

    public getControlFor(controlName: keyof ConditionForm): FormControl {
        return this.conditionFormGroup.get(controlName) as FormControl;
    }

    constructor(
        public readonly indicatorService: IndicatorService,
        public readonly fb: FormBuilder
    ) {
        const formControls: { [key in keyof ConditionForm]: AbstractControl } =
            {
                aggregationType: fb.control(null, Validators.required),
                indicatorIndex: fb.control(null, Validators.required),
                range: fb.control(null, Validators.required),
                equalityType: fb.control(null, Validators.required),
                comparedValue: fb.control(null, Validators.required),
            };

        this.conditionFormGroup = fb.group(formControls);
    }
}
