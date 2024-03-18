import { useEffect } from "react";
import { HelloFrom } from "../../types/helloFrom";
import { CommentResponse } from "../../types/posts";
import { logger } from "../../util/constants";

type AvatarProps = Pick<CommentResponse, "name"> & HelloFrom;

/**
 * Avatar component rendering First name initial (since we have wierd long names, so let's stick just with first name)
 */
export const Avatar = (props: AvatarProps) => {
  const initials = props.name.substring(0, 1);
  // TODO could be improved with some [`gravatar`](https://gravatar.com/) like fetching the profile image based on the email, or just adding set of possible backgrounds, so that we are not stuck with just one.

  useEffect(() => {
    logger(props.propsMessage + Avatar.name);
  }, [props.propsMessage]);

  return (
    <span
      className="l-box l-center l-center--text"
      style={{
        "--radius": "100%",
        "--box-bg": "blue",
        "--max-size": "24px",
        "--gap": "8px",
        width: "100%",
      }}
    >
      <span>{initials.toUpperCase()}</span>
    </span>
  );
};
