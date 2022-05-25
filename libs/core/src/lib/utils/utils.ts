export function notUndefined<T>(item: T | undefined): item is T {
    return !!item;
}

export function notNull<T>(item: T | null): item is T {
    return !!item;
}

/**
 * Add `null` values at the start of the array until it is of the same length as `expectedLength`.
 * @param array The array to unshift.
 * @param expectedLength The expected length of the array.
 */
export function unshiftWithNull(
    array: unknown[],
    expectedLength: number
): void {
    const missingValues = expectedLength - array.length;
    const nulls: null[] = new Array(missingValues).fill(null);
    array.unshift(...nulls);
}

/**
 * Returns the intersection of several sets.
 * @param sets The sets to intersect.
 * @returns A new set with the values that are in all sets.
 */
export function intersection<T>(sets: Set<T>[]): Set<T> {
    const firstSet = sets.splice(0, 1)[0];
    const result = new Set(firstSet);

    firstSet.forEach((item) => {
        let includeItem = true;

        for (let i = 0; i < sets.length; i++) {
            includeItem = sets[i].has(item);

            if (!includeItem) {
                break;
            }
        }

        if (!includeItem) {
            result.delete(item);
        }
    });

    return result;
}

export function union<T>(sets: Set<T>[]): Set<T> {
    const firstSet = sets.splice(0, 1)[0];
    const result = new Set(firstSet);

    for (const set of sets) {
        set.forEach((item) => result.add(item));
    }

    return result;
}

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
