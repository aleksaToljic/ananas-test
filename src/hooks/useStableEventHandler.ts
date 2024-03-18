import { useCallback, useRef } from 'react';

/**
 * Creates a stable reference to an unstable callback function.
 *
 * This is useful to retain referential equality of functions used as event
 * handler callbacks.
 *
 * @example
 * const [value, setValue] = useState(0);
 * // handleClick will be the same reference across all renders
 * const handleClick = useStableEventHandler(() => {
 *     // but it will always use 'value' state from the latest render
 *     setValue(value + Math.round(Math.random() * 100));
 * });
 *
 * return <button onClick={handleClick}>{value}</button>
 *
 * @param handler The unstable event handler callback.
 */
export function useStableEventHandler<T extends (...args: any) => any>(handler: T) {
    const ref = useRef<T>(handler);
    ref.current = handler;
    return useCallback((...params: Parameters<T>): ReturnType<T> => {
        return ref.current(...(params as any[]));
    }, []);
}
