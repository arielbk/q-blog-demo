export type Post = {
  user: User;
  id: number;
  title: string;
  body: string;
  comments: PostComment[];
};

export type User = {
  id: number;
  name: string;
  username: string;
};

export type PostComment = {
  id: number;
  name: string;
  email: string;
  body: string;
};
