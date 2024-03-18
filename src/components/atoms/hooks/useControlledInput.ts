import React, { useEffect, useState } from "react";
import { useEventHandlerProxy } from "../../../hooks/useEventHandlerProxy";

/**
 * Wraps `value` and `onChange` props of potentially uncontrolled input component and
 * returns proxy state and callback that ensure the input is controlled.
 *
 * @param originalValue - The original `value` prop
 * @param originalOnChange - The original `onChange` prop
 */
export function useControlledInput<T extends HTMLInputElement>(
  originalValue?: T["value"],
  originalOnChange?: React.ChangeEventHandler<T>,
) {
  const [value, setValue] = useState<
    Exclude<T["value"], undefined | null> | string
  >(originalValue ?? "");

  useEffect(() => {
    setValue(originalValue ?? "");
  }, [originalValue]);

  const onChange = useEventHandlerProxy(
    originalOnChange,
    function handleChange(event: React.ChangeEvent<T>) {
      setValue(event.target.value ?? "");
    },
  );

  return {
    value,
    onChange,
  };
}
