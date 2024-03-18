import { EventHandler, SyntheticEvent } from 'react';
import { useStableEventHandler } from './useStableEventHandler';

/**
 * Creates a stable event handler which acts as a proxy to the original handler (which may be undefined).
 *
 * @param originalHandler Original event handler.
 * @param handler Event handler to be called before the originalHandler.
 * @returns
 */
export function useEventHandlerProxy<T extends Event = Event, U extends Element = Element>(
    originalHandler: EventHandler<SyntheticEvent<U, T>> | undefined,
    handler: EventHandler<SyntheticEvent<U, T>>,
) {
    return useStableEventHandler((e: SyntheticEvent<U, T>) => {
        if (typeof originalHandler === 'function') {
            originalHandler(e);
        }
        if (!e.isDefaultPrevented()) {
            handler(e);
        }
    });
}
