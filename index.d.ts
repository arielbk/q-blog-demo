interface Post {
  user: User;
  id: number;
  title: string;
  body: string;
  comments: Comment[];
}

interface User {
  id: number;
  name: string;
  username: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
