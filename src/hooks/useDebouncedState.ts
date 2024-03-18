import { useEffect, useRef, useState } from 'react';

/**
 * Transformer callback optionally used by {@link useDebouncedState `useDebouncedState()`}.
 */
export type DebounceTransformer<T, U> = (value?: U, previousValue?: T) => T;

/**
 * Default `DebounceTransformer` with referential stability.
 * @internal
 */
function identity<T>(value: T): T {
    return value;
}

/**
 * useDebouncedState hook updates the state after a specified amount of time has
 * passed since the last call to the returned setState function.
 *
 * @param delayMs -  Number of milliseconds to debounce update for.
 * @param setter - Optional transformation function (defaults to identity function).
 * @param initialValue - Optional initial value (will be passed to the setter first, if set).
 */
export function useDebouncedState<T, U>(
    delayMs: number,
    setter: DebounceTransformer<T, U>,
    initialValue?: U,
): [T, (value?: U) => void];
export function useDebouncedState<T>(
    delayMs: number,
    setter?: DebounceTransformer<T, T>,
    initialValue?: T,
): [T, (value?: T) => void];
export function useDebouncedState<T, U extends T = T>(
    delayMs: number,
    // NB: using type assertion here to silence "U | undefined not assignable to T" error.
    // This is safe to do here since the two overloads provide correct type checking guarantees.
    // If setter is not provided it will match the 2nd overload which makes sure that U = T.
    setter: DebounceTransformer<T, U> = identity as DebounceTransformer<T, U>,
    initialValue?: U,
): [T, (value?: U) => void] {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const nextState = useRef<U>();
    const lastStartTime = useRef(Date.now());

    const [state, setState] = useState<T>(() => {
        return initialValue ?? setter(initialValue);
    });

    const [setNextState, setSetNextState] = useState(() => (value?: U) => {
        setState(setter(value, state));
    });

    useEffect(() => {
        function schedule(delay: number) {
            lastStartTime.current = Date.now();
            timer.current = setTimeout(() => {
                setState((previousState) => setter(nextState.current, previousState));
            }, delay);
        }

        if (timer.current !== null) {
            clearTimeout(timer.current);
            const elapsedTime = Date.now() - lastStartTime.current;
            if (elapsedTime >= delayMs) {
                setState((previousState) => setter(nextState.current, previousState));
                timer.current = null;
            } else {
                schedule(delayMs - elapsedTime);
            }
        }

        setSetNextState(() => (value?: U) => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
            }
            nextState.current = value;
            schedule(delayMs);
        });
    }, [delayMs, setter]);

    useEffect(() => {
        return () => {
            if (timer.current !== null) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    return [state, setNextState];
}
