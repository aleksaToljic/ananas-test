/**
 * Single post object that we get by fetching all posts.
 */
export interface PostsResponse {
  /**
   * Id of the user that created the post
   */
  userId: number;
  /**
   * Id of the post
   */
  id: number;
  /**
   * Title of the post.
   */
  title: string;
  /**
   * Post content.
   */
  body: string;
}

/**
 * Single comment object that we get by fetching the comments.
 */
export interface CommentResponse {
  /**
   * Post Id, that this comment is bind to.
   */
  readonly postId: number;
  /**
   * comment id
   */
  readonly id: number;
  /**
   * Name of the user that added this comment.
   */
  readonly name: string;
  /**
   * email of the user that added this comment.
   */
  readonly email: string;
  /**
   * Comment
   */
  readonly body: string;
}
