import { FormBuilder, Validators } from '@angular/forms';
import {
    IndicatorConfigurationFormGroup,
    IndicatorConfigurator,
} from './indicator.configuration';

export enum PriceDisplayType {
    OPEN,
    CLOSE,
    CANDLESTICK,
}

export type PriceIndicatorConfiguration = {
    display: PriceDisplayType;
};

export class PriceIndicatorConfigurator extends IndicatorConfigurator<PriceIndicatorConfiguration> {
    protected getDefaultConfiguration(): PriceIndicatorConfiguration {
        return {
            display: PriceDisplayType.CLOSE,
        };
    }

    constructor(
        fb: FormBuilder,
        initialConfiguration?: PriceIndicatorConfiguration
    ) {
        super(fb, initialConfiguration);
    }

    public getFormGroup(): IndicatorConfigurationFormGroup<PriceIndicatorConfiguration> {
        return new IndicatorConfigurationFormGroup<PriceIndicatorConfiguration>(
            {
                display: {
                    displayName: 'Type',
                    formControl: this.fb.control(this.configuration.display, [
                        Validators.required,
                    ]),
                },
            }
        );
    }
}
