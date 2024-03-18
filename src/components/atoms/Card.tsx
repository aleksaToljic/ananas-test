import { ComponentPropsWithoutRef, useEffect } from "react";
import { HelloFrom } from "../../types/helloFrom";
import { logger } from "../../util/constants";

type CardProps = ComponentPropsWithoutRef<"div"> & HelloFrom;

/**
 * Card component for post.comments and post.description.
 */
export const Card = (props: CardProps) => {
  useEffect(() => {
    logger(props.propsMessage + Card.name);
  }, [props.propsMessage]);

  return (
    //TODO add some classname util lib like `clsx`
    <div
      className={`l-box ${props.className}`}
      style={{
        "--radius": "10px",
        "--color": "#30363d",
        "--box-bg": "#0d1117",
        "--border-thin": "1px",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};
