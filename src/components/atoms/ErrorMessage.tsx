import { useEffect } from "react";
import { HelloFrom } from "../../types/helloFrom";
import { logger } from "../../util/constants";

interface ErrorMessageProps extends HelloFrom {
  /**
   * Mandatory field, we want to move handling of rendering the error outsite of this component {error ? <ErrorMessage...>: null}
   */
  error: string;
}

/**
 * Error message should be used when something went wrong with the requests, but could be improved to be used for any kind of error message
 */
export const ErrorMessage = (props: ErrorMessageProps) => {
  useEffect(() => {
    logger(props.propsMessage + ErrorMessage.name);
  }, [props.propsMessage]);

  return (
    <h4 className="l-box" style={{ "--text-color": "rgb(233, 20, 41)" }}>
      {props.error}
    </h4>
  );
};
