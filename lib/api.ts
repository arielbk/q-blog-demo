import axios from 'axios';
import { Post, PostComment, User } from '../types';
import { CommentRes, PostRes, UserRes } from './apiTypes';

export const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getAllPosts = async () => {
  try {
    const postsRes = await apiClient.get<PostRes[]>('/posts');

    const usersRes = await apiClient.get<UserRes[]>('/users');
    const users: User[] = usersRes.data.map((apiUser) => ({
      id: apiUser.id,
      name: apiUser.name,
      username: apiUser.username,
    }));

    // construct the Post type used locally
    const posts: Post[] = await Promise.all(
      postsRes.data.map(async ({ userId, id, title, body }) => {
        const comments = await getPostComments(id);
        return {
          user: users.find((user) => user.id === userId) as User, // assure TS we will always have a user
          id,
          title,
          body,
          comments,
        };
      })
    );

    return posts;
  } catch (error) {
    // real error handling here
    throw error;
  }
};

export const getPostById = async (id: number) => {
  try {
    const postRes = await apiClient.get<PostRes>(`/posts/${id}`);

    const userId = postRes.data.userId;
    const usersRes = await apiClient.get<UserRes[]>(`/users/${userId}`);
    const users: User[] = usersRes.data.map((apiUser) => ({
      id: apiUser.id,
      name: apiUser.name,
      username: apiUser.username,
    }));

    const comments = await getPostComments(postRes.data.id);
    const post: Post = {
      user: users.find((user) => user.id === userId) as User, // assure TS we will always have a user
      id: postRes.data.id,
      title: postRes.data.title,
      body: postRes.data.body,
      comments,
    };

    return post;
  } catch (error) {
    // real error handling here
    throw error;
  }
};

export const getPostComments = async (postId: number) => {
  try {
    const commentsRes = await apiClient.get<CommentRes[]>(
      `/posts/${postId}/comments`
    );
    const comments: PostComment[] = commentsRes.data.map(
      (fetchedComment) =>
        ({
          id: fetchedComment.id,
          name: fetchedComment.name,
          email: fetchedComment.email,
          body: fetchedComment.body,
        } as PostComment)
    );

    return comments;
  } catch (error) {
    throw error;
  }
};
