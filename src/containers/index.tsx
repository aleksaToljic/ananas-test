// This is copied from "unstated-next" lib
import { ComponentType, createContext, ReactNode, useContext } from "react";

export interface ContainerProviderProps<State = void> {
  initialState?: State;
  children: ReactNode;
}

export interface Container<Value, State = void> {
  Provider: ComponentType<ContainerProviderProps<State>>;
  useContainer: () => Value;
}

export function createContainer<Value, State = void>(
  useHook: (initialState?: State) => Value,
): Container<Value, State> {
  const Context = createContext<Value | null>(null);

  function Provider(props: ContainerProviderProps<State>) {
    const value = useHook(props.initialState);
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  function useContainer(): Value {
    const value = useContext(Context);
    if (value === null) {
      throw new Error("Component must be wrapped with <Container.Provider>");
    }
    return value;
  }

  return { Provider, useContainer };
}

export function useContainer<Value, State = void>(
  container: Container<Value, State>,
): Value {
  return container.useContainer();
}
