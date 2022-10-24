import axios from 'axios';
import { PostRes, UserRes } from './apiTypes';

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

    const posts: Post[] = postsRes.data.map(({ userId, id, title, body }) => ({
      user: users.find((user) => user.id === userId) as User, // assure TS we will always have a user
      id,
      title,
      body,
    }));

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

    const post: Post = {
      user: users.find((user) => user.id === userId) as User, // assure TS we will always have a user
      id: postRes.data.id,
      title: postRes.data.title,
      body: postRes.data.body,
    };

    return post;
  } catch (error) {
    // real error handling here
    throw error;
  }
};
