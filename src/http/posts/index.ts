import { AxiosPromise } from "axios";
import { CommentResponse, PostsResponse } from "../../types/posts";
import { HttpClient } from "../index";

export const Http = {
  getPosts(): AxiosPromise<PostsResponse[]> {
    return HttpClient.get("posts");
  },
  getPost(id: string): AxiosPromise<PostsResponse> {
    return HttpClient.get(`posts/${id}`);
  },
  getComments(postId: string): AxiosPromise<CommentResponse[]> {
    return HttpClient.get(`posts/${postId}/comments`);
  },
};
