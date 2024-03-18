import { ComponentPropsWithoutRef, useEffect } from "react";
import { HelloFrom } from "../../types/helloFrom";
import { logger } from "../../util/constants";
import { SearchProps, useSearchState } from "./hooks/useSearchState";

type SearchInputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "value" | "onChange"
> &
  SearchProps &
  HelloFrom;

export const SearchInput = ({
  value: originalValue,
  onChange: originalOnChange,
  onSearch,
  minimumSearchLength,
  debounceSearchMS,
  propsMessage,
  ...props
}: SearchInputProps) => {
  const { value, onChange } = useSearchState({
    value: originalValue,
    onChange: originalOnChange,
    onSearch: onSearch,
    minimumSearchLength: minimumSearchLength,
    debounceSearchMS: debounceSearchMS,
  });

  useEffect(() => {
    logger(propsMessage + SearchInput.name);
  }, [propsMessage]);

  return (
    <input
      {...props}
      type="search"
      inputMode="search"
      value={value}
      onChange={onChange}
      className={`e-input ${props.className}`}
    />
  );
};
