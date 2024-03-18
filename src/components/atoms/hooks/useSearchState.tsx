import React, { SyntheticEvent, useEffect } from "react";
import { useDebouncedState } from "../../../hooks/useDebouncedState";
import { useControlledInput } from "./useControlledInput";

/**
 * The event object passed to typeahead's onSearch callback.
 */
export interface SearchEvent {
  target: { value: string };
}

/**
 *
 */
export interface SearchProps {
  /**
   * The current input value.
   */
  readonly value?: string;
  /**
   * When `searchMode` is set to `'onChange'`, this controls the minimum length of text
   * that triggers the search.
   *
   * Defaults to `3`.
   *
   * Ignored if `searchMode` is set to `'onEnter'`.
   */
  readonly minimumSearchLength?: number;
  /**
   * Time (in milliseconds) to debounce calls to `onSearch` callback
   * when `searchMode` is set to `'onChange'`.
   *
   * Defaults to `300`.
   */
  readonly debounceSearchMS?: number;
  /**
   * Event callback invoked when user triggers the search action.
   */
  readonly onSearch?: (event: SearchEvent) => void;
  /**
   * Event callback invoked when user triggers the change event.
   */
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchState {
  value: string;
  onChange: (e: SyntheticEvent<HTMLInputElement, Event>) => void;
}

export function useSearchState({
  value: originalValue,
  onChange: originalOnChange,
  onSearch,
  minimumSearchLength = 3,
  debounceSearchMS = 300,
}: SearchProps): SearchState {
  const { value, onChange } = useControlledInput(
    originalValue,
    originalOnChange,
  );

  const [searchString, setSearchString] = useDebouncedState(
    debounceSearchMS,
    undefined,
    value,
  );

  useEffect(() => {
    setSearchString(value);
  }, [value, setSearchString]);

  useEffect(() => {
    if (
      typeof onSearch === "function" &&
      searchString.length >= minimumSearchLength
    ) {
      onSearch({ target: { value: searchString } });
    }
  }, [onSearch, searchString, minimumSearchLength]);

  return {
    value,
    onChange,
  };
}
