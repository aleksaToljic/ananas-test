import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HelloFrom } from "../../types/helloFrom";
import { PostsResponse } from "../../types/posts";
import { logger } from "../../util/constants";

type PostRowProps = PostsResponse & HelloFrom;

/**
 * Component to render the single post, and by clicking on it, lead the user to the Post page, where he can see all the comments.
 */
export const PostRow = (props: PostRowProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    logger(props.propsMessage + PostRow.name);
  }, [props.propsMessage]);

  return (
    <div
      className="l-box u-gap--l m-post-row l-stack l-center"
      onClick={() => navigate(`/post/${props.id}`)}
    >
      <h4>{props.title}</h4>
      <span>{props.body}</span>
    </div>
  );
};
