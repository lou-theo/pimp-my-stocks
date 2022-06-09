import {BaseIndicator} from "../../services/indicator/indicator";

export type IndicatorFactory = {
    displayName: string;
    index: number;
    createIndicator: () => BaseIndicator;
};
