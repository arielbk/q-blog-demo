import { render, screen } from '@testing-library/react';
import PostList from '../components/PostList';
import { mockPosts } from '../__mocks__/blog';

describe('Empty post list', () => {
  beforeEach(() => {
    render(<PostList query="" posts={[]} />);
  });

  it('displays a placeholder', () => {
    const placeholder = screen.getByTestId('postlist-empty');
    expect(placeholder).toBeDefined();
  });
});

describe('Post list with posts', () => {
  beforeEach(() => {
    render(<PostList query="" posts={mockPosts} />);
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

describe('No posts found for query', () => {
  beforeEach(() => {
    render(<PostList query={'this author does not exist'} posts={mockPosts} />);
  });

  it('displays a placeholder', () => {
    const placeholder = screen.getByTestId('postlist-empty');
    expect(placeholder).toBeDefined();
  });
});

describe('Post list with author search query', () => {
  const query = mockPosts[0].user.name;
  beforeEach(() => {
    render(<PostList query={query} posts={mockPosts} />);
  });

  it('displays only filtered blog posts', () => {
    const postAuthors = screen.getAllByTestId('postlist-author');
    postAuthors.forEach((author) => {
      expect(author.textContent?.toLowerCase()).toContain(query.toLowerCase());
    });
  });
});
