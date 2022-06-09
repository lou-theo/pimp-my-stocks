export enum EqualityType {
    EQUAL,
    INFERIOR,
    INFERIOR_OR_EQUAL,
    SUPERIOR,
    SUPERIOR_OR_EQUAL,
    DIFFERENT,
}

export const EqualityTypeLabelMapping: Record<EqualityType, string> = {
    [EqualityType.EQUAL]: '=',
    [EqualityType.INFERIOR]: '<',
    [EqualityType.INFERIOR_OR_EQUAL]: '<=',
    [EqualityType.SUPERIOR]: '>',
    [EqualityType.SUPERIOR_OR_EQUAL]: '>=',
    [EqualityType.DIFFERENT]: '!=',
};
