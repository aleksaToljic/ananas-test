import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../components/atoms/ErrorMessage";
import { PostRow } from "../../components/posts/PostRow";
import { HelloFromContainer } from "../../containers/HelloFromContainer";
import { useAsyncTrigger } from "../../hooks/useAsyncTrigger";
import { Http } from "../../http/posts";
import { PostsResponse } from "../../types/posts";

const Posts = () => {
  const [error, setErrors] = useState<string>();
  const { propsMessage } = HelloFromContainer.useContainer();
  const {
    trigger,
    result: posts,
    isLoading,
  } = useAsyncTrigger(async (abortSignal) => {
    try {
      const posts = await Http.getPosts();

      if (abortSignal.aborted) {
        return [] as PostsResponse[];
      }

      return posts.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrors(e.message ?? e);
      } else {
        setErrors("Something went wrong :(");
      }

      return [] as PostsResponse[];
    }
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <div className="l-stack l-center--text" style={{ "--stack-gap": "40px" }}>
      <h1>Ananas posts</h1>

      {error ? (
        <ErrorMessage propsMessage={propsMessage} error={error} />
      ) : null}

      <div className="l-center l-stack" style={{ "--max-size": "700px" }}>
        {isLoading ? (
          //TODO we could also add some sceleton loading while we fetch the posts.
          <div>...Loading</div>
        ) : (
          //TODO we could optimize by lazy load the posts, by the help of IntersectionObserver.
          posts?.map((post) => (
            <PostRow propsMessage={propsMessage} key={post.id} {...post} />
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
