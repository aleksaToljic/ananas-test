import { useEffect } from "react";
import { HelloFrom } from "../../types/helloFrom";
import { CommentResponse } from "../../types/posts";
import { logger } from "../../util/constants";
import { Avatar } from "../atoms/Avatar";
import { Card } from "../atoms/Card";

type CommentCardProps = CommentResponse & HelloFrom;

/**
 * CommentCard component that renders the comment with small info about the user that commented and it's avatar.
 */
export const CommentCard = (props: CommentCardProps) => {
  useEffect(() => {
    logger(props.propsMessage + CommentCard.name);
  }, [props.propsMessage]);

  return (
    <Card
      className="l-stack m-comment-card"
      style={{
        "--gap": "20px",
        "--max-size": "100%",
        "--center-gap": "20px",
        "--stack-gap": "20px",
      }}
      propsMessage={props.propsMessage}
    >
      <div className="l-cluster" style={{ "--gap": "8px" }}>
        <Avatar propsMessage={props.propsMessage} name={props.name} />

        <p>
          {props.name} ({props.email})
        </p>
      </div>

      <p>{props.body}</p>
    </Card>
  );
};
