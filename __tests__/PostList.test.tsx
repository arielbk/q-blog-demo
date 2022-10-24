import { render, screen } from '@testing-library/react';
import { User, Post, PostComment } from '../types';
import PostList from '../components/PostList';

const mockUsers: User[] = [
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

const mockComments: PostComment[] = [
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

const mockPosts: Post[] = [
  {
    user: mockUsers[0],
    id: 1,
    title: 'First title',
    body: 'First body text',
    comments: [],
  },
  {
    user: mockUsers[0],
    id: 2,
    title: 'Second title',
    body: 'Second body text',
    comments: [],
  },
  {
    user: mockUsers[1],
    id: 3,
    title: 'Third title',
    body: 'Third body text',
    comments: [],
  },
];

describe('Empty post list', () => {
  beforeEach(() => {
    render(<PostList posts={[]} />);
  });

  it('displays a placeholder', () => {
    const placeholder = screen.getByTestId('postlist-empty');
    expect(placeholder).toBeDefined();
  });
});

describe('Post list with posts', () => {
  beforeEach(() => {
    render(<PostList posts={mockPosts} />);
  });

  it('displays the correct number of posts', () => {
    const posts = screen.getAllByTestId('postlist-item');
    expect(posts.length).toBe(mockPosts.length);
  });

  it('displays the correct title', () => {
    const postTitles = screen.getAllByTestId('postlist-title');
    postTitles.forEach((title, i) => {
      expect(title.textContent).toBe(mockPosts[i].title);
    });
  });

  it('displays the correct number of comments', () => {
    const postComments = screen.getAllByTestId('postlist-commentcount');
    postComments.forEach((comment, i) => {
      const commentCount = mockPosts[i].comments.length.toString();
      expect(comment.textContent).toContain(commentCount);
    });
  });

  it('displays correct author names', () => {
    const postAuthors = screen.getAllByTestId('postlist-author');
    postAuthors.forEach((author, i) => {
      const authorName = mockPosts[i].user.name;
      expect(author.textContent).toContain(authorName);
    });
  });
});
