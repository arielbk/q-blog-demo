import { User, PostComment, Post } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Someone',
    username: 'someuser',
  },
  {
    id: 2,
    name: 'Another person',
    username: 'someother',
  },
];

export const mockComments: PostComment[] = [
  {
    id: 1,
    name: 'test',
    email: 'test',
    body: 'body of the first comment',
  },
  {
    id: 2,
    name: 'test2',
    email: 'test',
    body: 'body of the second comment',
  },
  {
    id: 3,
    name: 'test3',
    email: 'test',
    body: 'body of the third comment',
  },
];

export const mockPosts: Post[] = [
  {
    user: mockUsers[0],
    id: 1,
    title: 'First title',
    body: 'First body text',
    comments: [mockComments[0]],
  },
  {
    user: mockUsers[0],
    id: 2,
    title: 'Second title',
    body: 'Second body text',
    comments: [mockComments[1], mockComments[2]],
  },
  {
    user: mockUsers[1],
    id: 3,
    title: 'Third title',
    body: 'Third body text',
    comments: [],
  },
];
