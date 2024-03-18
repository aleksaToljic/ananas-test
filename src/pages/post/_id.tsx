import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components/atoms/Card";
import { ErrorMessage } from "../../components/atoms/ErrorMessage";
import { CommentCard } from "../../components/posts/CommentCard";
import { HelloFromContainer } from "../../containers/HelloFromContainer";
import { useAsyncTrigger } from "../../hooks/useAsyncTrigger";
import { Http } from "../../http/posts";

const Post = () => {
  const params = useParams<{ id: string }>();
  const [error, setError] = useState<string>();
  const { propsMessage } = HelloFromContainer.useContainer();

  const {
    trigger: getPost,
    isLoading: isLoadingPost,
    result: post,
  } = useAsyncTrigger(async (abortSignal, id) => {
    try {
      //there is a lot of things we could improve that depends on how we want to handle UX,
      // like should we separate posts and comments requests, with different loaders, error handlers, etc...
      // which would speed up the load of initial set of data for the user to see.

      const post = await Http.getPost(id as string);
      const comments = await Http.getComments(id as string);

      if (abortSignal.aborted) {
        return undefined;
      }

      return { ...post.data, comments: comments.data };
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message ?? e);
      } else {
        setError("Something went wrong :(");
      }

      return undefined;
    }
  });

  useEffect(() => {
    getPost(params.id);
  }, [params.id, getPost]);

  return (
    <div className="l-stack" style={{ "--stack-gap": "40px" }}>
      {error ? (
        <ErrorMessage propsMessage={propsMessage} error={error} />
      ) : null}

      <div className="l-center l-stack" style={{ "--max-size": "600px" }}>
        {isLoadingPost ? (
          //TODO we could also add some sceleton loading while we fetch the post and it's comments.
          <div>...Loading</div>
        ) : post ? (
          <div className="l-stack" style={{ "--stack-gap": "20px" }}>
            <h4>{post.title}</h4>

            <Card propsMessage={propsMessage}>
              <p>{post.body}</p>
            </Card>

            {post.comments.length ? (
              <p>{`${post.comments.length} comments`}</p>
            ) : null}

            {post.comments.map((comment) => {
              return <CommentCard {...comment} propsMessage={propsMessage} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
