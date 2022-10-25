import { render, screen } from '@testing-library/react';
import PostList from '../components/PostList';
import { mockPosts } from '../__mocks__/blog';

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
