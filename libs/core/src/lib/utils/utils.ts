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
