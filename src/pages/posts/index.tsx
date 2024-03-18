import { AxiosError } from "axios";
import { matchSorter } from "match-sorter";
import { Fragment, useEffect, useState } from "react";
import { ErrorMessage } from "../../components/atoms/ErrorMessage";
import { SearchInput } from "../../components/atoms/SearchInput";
import { PostRow } from "../../components/posts/PostRow";
import { HelloFromContainer } from "../../containers/HelloFromContainer";
import { useAsyncTrigger } from "../../hooks/useAsyncTrigger";
import { Http } from "../../http/posts";
import { PostsResponse } from "../../types/posts";

const Posts = () => {
  //TODO in task there is a feature request:
  // Posts route should show a list of posts and associated comments.
  // Every post should have a user's name associated.
  // Which means that for every post we should fire additional request, and one to get the comments.
  // This is not very performant so we would defensively need infinite loading of the posts to limit the requests,
  // we can use IntersectionObserver, to know when we need to fetch more data,
  // on search we would reset the infinite loading, so we could also cache already loaded information (to not trigger again some requests)

  const [error, setErrors] = useState<string>();
  const [searchedValue, setSearchedValue] = useState("");
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

  //TODO this could be optimized by some sort of caching
  const filteredPosts = matchSorter(posts || [], searchedValue ?? "", {
    keys: ["title"],
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
          <Fragment>
            <SearchInput
              propsMessage={propsMessage}
              minimumSearchLength={0}
              placeholder="Search posts by title"
              onSearch={(e) => setSearchedValue(e.target.value)}
            />

            {filteredPosts?.map((post) => (
              <PostRow propsMessage={propsMessage} key={post.id} {...post} />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Posts;
