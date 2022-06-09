import { FormBuilder } from '@angular/forms';
import { Indicator } from './indicator';
import {
    IndicatorConfigurationFormGroup,
    IndicatorConfigurator,
} from './indicator.configuration';
import { PriceIndicator } from './price';

export type SimpleMovingAverageIndicatorConfiguration = {
    sourceIndicator: Indicator<number[]>;
    length: number;
};

export class SimpleMovingAverageIndicatorConfigurator extends IndicatorConfigurator<SimpleMovingAverageIndicatorConfiguration> {
    protected getDefaultConfiguration(): SimpleMovingAverageIndicatorConfiguration {
        return {
            sourceIndicator: new PriceIndicator(this.fb),
            length: 14,
        };
    }

    constructor(
        fb: FormBuilder,
        initialConfiguration?: SimpleMovingAverageIndicatorConfiguration
    ) {
        super(fb, initialConfiguration);
    }

    public getFormGroup(): IndicatorConfigurationFormGroup<SimpleMovingAverageIndicatorConfiguration> {
        return new IndicatorConfigurationFormGroup<SimpleMovingAverageIndicatorConfiguration>(
            {
                sourceIndicator: {
                    displayName: 'source',
                    formControl: this.fb.control(
                        this.configuration.sourceIndicator
                    ),
                },
                length: {
                    displayName: 'longueur',
                    formControl: this.fb.control(this.configuration.length),
                },
            }
        );
    }
}
