import { FormBuilder } from '@angular/forms';
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
                    formControl: this.fb.control(this.configuration.lowerLimit),
                },
                upperLimit: {
                    displayName: 'Limite haute',
                    formControl: this.fb.control(this.configuration.upperLimit),
                },
                length: {
                    displayName: 'longueur',
                    formControl: this.fb.control(this.configuration.length),
                },
            }
        );
    }
}
