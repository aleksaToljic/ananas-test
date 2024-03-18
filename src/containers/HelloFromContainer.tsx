import { HelloFrom } from "../types/helloFrom";
import { createContainer } from "./index";

type HelloFromState = HelloFrom;

/**
 * We need a single place where we could change the propsMessage, this is just one of many ways to do so.
 */
function useHelloFrom(
  initialState: HelloFromState = { propsMessage: "Hello world " },
) {
  //TODO some action that can change propsMessage by typing to some input, of whatever :shrug
  return initialState;
}

export const HelloFromContainer = createContainer<
  HelloFromState,
  HelloFromState
>(useHelloFrom);

//TODO if this would implement setState function, or similar, it would be nice to add unit test for this container using https://github.com/testing-library/react-hooks-testing-library
