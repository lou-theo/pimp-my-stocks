import { FormBuilder, Validators } from '@angular/forms';
import {
    IndicatorConfigurationFormGroup,
    IndicatorConfigurator,
} from './indicator.configuration';

export type RelativeStrengthIndexIndicatorConfiguration = {
    lowerLimit: number;
    upperLimit: number;
    length: number;
};

export class RelativeStrengthIndexIndicatorConfigurator extends IndicatorConfigurator<RelativeStrengthIndexIndicatorConfiguration> {
    protected getDefaultConfiguration(): RelativeStrengthIndexIndicatorConfiguration {
        return {
            lowerLimit: 20,
            upperLimit: 80,
            length: 14,
        };
    }

    constructor(
        fb: FormBuilder,
        initialConfiguration?: RelativeStrengthIndexIndicatorConfiguration
    ) {
        super(fb, initialConfiguration);
    }

    public getFormGroup(): IndicatorConfigurationFormGroup<RelativeStrengthIndexIndicatorConfiguration> {
        return new IndicatorConfigurationFormGroup<RelativeStrengthIndexIndicatorConfiguration>(
            {
                lowerLimit: {
                    displayName: 'Limite basse',
                    formControl: this.fb.control(
                        this.configuration.lowerLimit,
                        [
                            Validators.required,
                            Validators.min(0),
                            Validators.max(100),
                        ]
                    ),
                },
                upperLimit: {
                    displayName: 'Limite haute',
                    formControl: this.fb.control(
                        this.configuration.upperLimit,
                        [
                            Validators.required,
                            Validators.min(0),
                            Validators.max(100),
                        ]
                    ),
                },
                length: {
                    displayName: 'Longueur',
                    formControl: this.fb.control(this.configuration.length, [
                        Validators.required,
                    ]),
                },
            }
        );
    }
}
