import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
} from '@angular/forms';

export type IndicatorConfiguration = {
    [key: string]: unknown;
};

/* Configurator */

export abstract class BaseIndicatorConfigurator {
    public abstract getFormGroup(): BaseIndicatorConfigurationFormGroup;
    public abstract resetConfiguration(): void;
    public abstract updateConfiguration(
        newConfiguration: IndicatorConfiguration
    ): void;
}

export abstract class IndicatorConfigurator<
    TConfiguration extends IndicatorConfiguration
> extends BaseIndicatorConfigurator {
    protected _configuration: TConfiguration;
    public get configuration(): Readonly<TConfiguration> {
        return this._configuration;
    }

    constructor(
        protected readonly fb: FormBuilder,
        public initialConfiguration?: TConfiguration
    ) {
        super();
        this._configuration =
            initialConfiguration ?? this.getDefaultConfiguration();
    }

    public abstract override getFormGroup(): IndicatorConfigurationFormGroup<TConfiguration>;

    public resetConfiguration(): void {
        this._configuration = this.getDefaultConfiguration();
    }

    public updateConfiguration(newConfiguration: TConfiguration): void {
        this._configuration = newConfiguration;
    }

    protected abstract getDefaultConfiguration(): TConfiguration;
}

/* Form */

export type IndicatorConfigurationFormField = {
    displayName: string;
    formControl: FormControl;
};

export abstract class BaseIndicatorConfigurationFormGroup extends FormGroup {
    public fields: {
        [key: string]: IndicatorConfigurationFormField;
    };

    constructor(fields: { [key: string]: IndicatorConfigurationFormField }) {
        const controls: {
            [key: string]: AbstractControl;
        } = {};

        for (const key in fields) {
            controls[key] = fields[key].formControl;
        }

        super(controls);

        this.fields = fields;
    }
}

export class IndicatorConfigurationFormGroup<
    TConfiguration extends IndicatorConfiguration
> extends BaseIndicatorConfigurationFormGroup {
    declare fields: {
        [key in keyof TConfiguration]: IndicatorConfigurationFormField;
    };

    constructor(fields: {
        [key in keyof TConfiguration]: IndicatorConfigurationFormField;
    }) {
        super(fields);
    }

    public getConfiguration(): TConfiguration {
        return this.value as TConfiguration;
    }
}
