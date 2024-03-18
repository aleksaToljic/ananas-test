import { useCallback, useEffect, useRef, useState } from "react";
import { useStableEventHandler } from "./useStableEventHandler";

/**
 * It returns type needed or string 'error'
 */
type AsyncTriggerResult<Type> = Type;

/**
 * The state managed by the {@link useAsyncTrigger | `useAsyncTrigger()` hook}.
 */
interface AsyncTriggerState<T> {
  /**
   * Whether the operation is currently running (`isLoading: true`) or not.
   */
  readonly isLoading: boolean;
  /**
   * The result of the latest call. This will be `undefined` until the first call finishes (either successfully or not).
   */
  readonly result?: AsyncTriggerResult<T>;
}

/**
 * The actions provided by the {@link useAsyncTrigger | `useAsyncTrigger()` hook}.
 */
interface AsyncTriggerActions<T extends unknown[]> {
  /**
   * Triggers the async operation (invokes the callback provided to the `useAsyncTrigger()` hook).
   *
   * If a previous call is still awaiting the results it will be aborted.
   *
   * **Note**: this is a stable callback (the reference never changes between re-renders).
   *
   * @param args - The arguments to forward to the callback.
   */
  trigger(...args: T): void;
  /**
   * Aborts the currently running operation.
   *
   * **Note**: this is a stable callback (the reference never changes between re-renders).
   */
  abort(): void;
}

/**
 * The state and actions provided by the {@link useAsyncTrigger | `useAsyncTrigger()` hook}.
 */
export type AsyncTrigger<T, U extends unknown[]> = AsyncTriggerState<T> &
  AsyncTriggerActions<U>;

/**
 * Manages the state of an async operation.
 *
 * The operation is represented by an async callback provided to the hook which is
 * invoked when the `trigger()` action is called.
 *
 * Multiple invocations are handled by ignoring all but the latest call's results.
 *
 * The callback is provided with an AbortSignal that will be activated when the
 * operation should be aborted due to it being overridden by a new `trigger()` call,
 * by an explicit `abort()` call, or by the component unmounting.
 * Even if the abort signal is not used by the callback, the result of the
 * aborted call will always be ignored.
 *
 * **Note**: The callback arguments can be passed though the `trigger()` action,
 * but the data can also be safely closed over by the callback (i.e. you can freely
 * use state variables without worrying of memoizing/invalidating the callback).
 * You could also combine the two approaches.
 *
 * @param fn - The async callback
 */
export function useAsyncTrigger<T, U extends unknown[] = unknown[]>(
  fn: (abortSignal: AbortSignal, ...args: U) => Promise<AsyncTriggerResult<T>>,
): AsyncTrigger<T, U> {
  const [state, setState] = useState<AsyncTriggerState<T>>({
    isLoading: false,
    result: undefined,
  });

  const abortControllerRef = useRef<AbortController>();
  const abort = useCallback((reason = "Aborted") => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(reason);
    }
  }, []);

  const trigger = useStableEventHandler((...args: U) => {
    abort("Overridden");
    setState((previousState) => {
      if (previousState.isLoading) {
        return previousState;
      }
      return {
        isLoading: true,
        result: undefined,
      };
    });

    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    signal.addEventListener(
      "abort",
      () => {
        if (abortControllerRef.current?.signal === signal) {
          setState((previousState) => {
            if (!previousState.isLoading && !previousState.result) {
              return previousState;
            }
            return {
              isLoading: false,
              result: undefined,
            };
          });
        }
      },
      { once: true },
    );

    fn(signal, ...args)
      .then((result) => {
        if (!signal.aborted) {
          setState({
            isLoading: false,
            result,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (!signal.aborted) {
          setState({
            isLoading: false,
            result: undefined,
          });
        }
      });
  });

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort("Cancelled");
      }
    };
  }, []);

  return { ...state, abort, trigger };
}
