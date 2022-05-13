export function notUndefined<T>(item: T | undefined): item is T {
    return !!item;
}

export function notNull<T>(item: T | null): item is T {
    return !!item;
}
