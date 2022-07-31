export function sum(values: number[]): number {
    return values.reduce((a, b) => a + b);
}

export function average(values: number[]): number {
    return sum(values) / values.length;
}

export function median(values: number[]): number {
    const sorted = Array.from(values).sort((a, b) => a - b);
    const length = sorted.length;
    const halfLength = Math.floor(length / 2);

    if (length % 2 === 0) {
        const sum = sorted[halfLength] + sorted[halfLength - 1];
        return sum / 2;
    } else {
        return sorted[halfLength];
    }
}

export function roundDecimal(value: number, decimalPrecision: number = 2) {
    return Math.round((value + Number.EPSILON) * (10 ** decimalPrecision)) / (10 ** decimalPrecision)

}
